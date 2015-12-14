'use strict';

export function selectingTextForTranslation(messageId) {
    return {
        type: 'selectingTextForTranslation',
        messageId: messageId
    };
}

export function selectedTextForTranslation(text) {
    return {
        type: 'selectedTextForTranslation',
        text: text
    };
}

export function clearSelectedTextForTranslation() {
    return {
        type: 'clearSelectedTextForTranslation'
    };
}