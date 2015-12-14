'use strict';
const db = require('./db');
const SessionManager = require('./session-manager');

function messageEventHandler(socket) {
    socket.on('message send', function(messageInfo) {
        console.log('message send ' + JSON.stringify(messageInfo));

        let conversation = db.getConversationById(messageInfo.conversationId);
        conversation.messages.push(messageInfo.message);

        conversation.users.forEach(function (userId) {
            if (userId != messageInfo.message.from) {
                let userSession = SessionManager.getSessionByUserId(userId);
                if (userSession) {
                    messageInfo.sessionId = userSession.id;
                    userSession.socket.emit('message receive', messageInfo);
                }
            }
        });
    });
};

module.exports = [messageEventHandler];