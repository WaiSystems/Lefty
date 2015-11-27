var db = require('./db');
var SessionManager = require('./session-manager');

var messageEventHandler = function(socket) {
    socket.on('message send', function(messageInfo) {
        console.log('message send ' + JSON.stringify(messageInfo));

        var conversation = db.getConversationById(messageInfo.conversationId);
        conversation.messages.push(messageInfo.message);

        conversation.users.forEach(function (userId) {
            if (userId != messageInfo.message.from) {
                var userSession = SessionManager.getSessionByUserId(userId);
                if (userSession) {
                    messageInfo.sessionId = userSession.id;
                    userSession.socket.emit('message receive', messageInfo);
                }
            }
        });
    });
};

module.exports = [messageEventHandler];