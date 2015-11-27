'use strict';
const uid2 = require('uid2');
const _ = require('lodash');

const Session = require('./session.js');

const SESSION_ID_SIZE = 16;

class SessionManager {
    constructor() {
        this._sessions = {};
        this._socketio = null;
        this._socketEventHandlers = [];
    }

    initialize(server, socketEventHandlers) {
        this._socketEventHandlers = socketEventHandlers;

        let sessionManager = this;
        this._socketio = require('socket.io')(server);
        this._socketio.on('connection', function(socket){
            console.log('a user connected');

            socket.on('disconnect', function(){
                console.log('user disconnected');
                var session = sessionManager.getSessionBySocket(socket);
                if (session) {
                    sessionManager.destroySession(session.id);
                }
            });

            socket.on('session connect', function(session) {
                console.log('session connect for ' + session.sessionId);
                sessionManager.getSessionById(session.sessionId).socket = socket;
            });

            sessionManager._socketEventHandlers.forEach(function(handler) {
                handler(socket);
            });
        });
    }

    createSession(user) {
        const newSessionId = uid2(SESSION_ID_SIZE);
        this._sessions[newSessionId] = new Session(newSessionId, user);

        console.log('Created a new session with id ' + newSessionId);
        return newSessionId;
    };

    destroySession(sessionId) {
        console.log('Destroying session ' + sessionId);

        let sessionObject = this._sessions[sessionId];
        if (sessionObject.socket != null) {
            sessionObject.socket.disconnect();
            sessionObject.socket = null;
        }

        delete this._sessions[sessionId];
    };

    getSessionById(id) {
        return this._sessions[id];
    }

    getSessionByUserId(userId) {
        return _.findWhere(this._sessions, {user: {id : userId}});
    }

    getSessionBySocket(socket) {
        return _.findWhere(this._sessions, {'socket' : socket});
    }
}

module.exports = new SessionManager();