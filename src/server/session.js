'use strict';
var uid2 = require('uid2');
var _ = require('lodash');

const SESSION_ID_SIZE = 16;

let sessions = {};

class Session {
    constructor(id, user) {
        this._id = id;
        this._user = user;
        this._socket = null;
    }

    get id() {
        return this._id;
    }

    get user() {
        return this._user;
    }

    get socket() {
        return this._socket;
    }
    set socket(sock) {
        this._socket = sock;
    }
}

exports.createSession = function(user) {
    var newSessionId = uid2(SESSION_ID_SIZE);
    sessions[newSessionId] = new Session(newSessionId, user);

    console.log('Created a new session with id ' + newSessionId);
    return newSessionId;
};

exports.destroySession = function(sessionId) {
    var sessionObject = sessions[sessionId];
    if (sessionObject.socket) {
        sessionObject.socket.close();
    }

    delete sessions[sessionId];
};

exports.getSessionById = function(id) {
    return sessions[id];
};

exports.getSessionByUserId = function(userId) {
    return _.findWhere(sessions, {'user.id' : userId});
};