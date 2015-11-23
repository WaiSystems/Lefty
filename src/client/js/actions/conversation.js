export function selectConversation(conversationId) {
    return {
        type: "selectConversation",
        conversationId: conversationId
    };
}