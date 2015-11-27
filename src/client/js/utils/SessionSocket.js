'use strict';
import io from 'socket.io-client';

import { receiveMessage } from '../actions/messages.js'

class SessionSocket {
    constructor() {
        this._socket = null;
        this._dispatch = null;
        this._sessionId = null;
    }

    connect(dispatch, sessionId) {
        this._dispatch = dispatch;
        this._sessionId = sessionId;

        this._socket = io();
        this._initSocketMessageHandlers();

        this._send('session connect', {});
    }

    sendMessage(conversationId, message) {
        this._send('message send', {
            conversationId: conversationId,
            message: message
        });
    }

    _initSocketMessageHandlers() {
        const sessionSocket = this;
        this._socket.on('message receive', function (newMessage) {
            sessionSocket._dispatch(receiveMessage(newMessage.conversationId, newMessage.message));
        });
    }

    _send(event, data) {
        data.sessionId = this._sessionId;
        this._socket.emit(event, data);
    }
}

export default new SessionSocket();

