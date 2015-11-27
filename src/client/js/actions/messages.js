export function createMessage(message) {
    return {
        type: "createMessage",
        message: message
    };
}

export function receiveMessage(conversationId, message) {
    return {
        type: "createMessage",
        conversationId: conversationId,
        message: message
    };
}