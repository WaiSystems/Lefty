'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import MessageItem from '../components/MessageItem.jsx';
import {selectedTextForTranslation, selectingTextForTranslation} from '../actions/translation.js';
import '../../css/messageSection.css';

const KEY_CODE_ARROW_LEFT = 37;
const KEY_CODE_ARROW_DOWN = 40;

class MessageList extends React.Component {
    constructor(props) {
        super(props);

        this._onUserSelectingContentInMessage = this._onUserSelectingContentInMessage.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
    }

    componentDidMount() {
        this._scrollToBottom();
        document.addEventListener('keydown', this._onKeyDown);
        document.addEventListener('keyup', this._onKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this._onKeyDown);
        document.removeEventListener('keyup', this._onKeyUp);
    }

    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this);
        this._shouldScrollBottom = (node.scrollTop + node.clientHeight) === node.scrollHeight;
    }

    componentDidUpdate() {
        if (this._shouldScrollBottom) {
           this._scrollToBottom();
        }
    }

    render() {
        if (this.props.conversation == null) {
            return (<ul className="message-list" />);
        }

        const users = this.props.users;
        const focusedMessageId = this.props.translation.selectedTextMessageId;
        const messageItems = this.props.conversation.messages.map((message) => {
            return (
                <MessageItem
                    key={message.id}
                    message={{
                        id: message.id,
                        user: _.findWhere(users, {id: message.from}),
                        timestamp: message.timestamp,
                        content: message.content
                    }}
                    isFocused={message.id == focusedMessageId}
                    onSelectingContentStarted={this._onUserSelectingContentInMessage}
                    onSelectingContentFinished={(text) => this.props.dispatch(selectedTextForTranslation(text))}
                />
            );
        });

        return (
            <ul className="message-list">
                {messageItems}
            </ul>
        );
    }

    _scrollToBottom() {
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }

    _onUserSelectingContentInMessage(messageId) {
        this.props.dispatch(selectingTextForTranslation(messageId));
    }

    // If the user is changing the selected text, inside a message, using the keyboard,
    // we need to update our state to singal the user is selecting new text for translation
    _onKeyDown(event) {
        // Check if this is a "text selection" keydown event: An arrow key
        // was pressed while holding the shift key.
        const isUserSelectingKey = (event.shiftKey &&
                                   ((event.keyCode >= KEY_CODE_ARROW_LEFT) &&
                                    (event.keyCode <= KEY_CODE_ARROW_DOWN)));

        // We're only interested in changes in the currently selected text if we're inside a
        // a message
        const hasMessageFocused = this.props.translation.selectedTextMessageId != '';

        // If needed, dispatch the "user is selecting text for translation" action
        if (isUserSelectingKey && hasMessageFocused) {
            if (false == this.props.translation.isUserSelectingText) {
                this.props.dispatch(selectingTextForTranslation(this.props.translation.selectedTextMessageId));
            }
        }
    }

    _onKeyUp(event) {
        // TODO: Check if the mouse is down?
        if (event.shiftKey && this.props.translation.isUserSelectingText) {
            console.log('Content key up');
            this.props.dispatch(selectedTextForTranslation(window.getSelection().toString()));
        }
    }
}

function mapStateToProps(state) {
    const userData = state.userData;

    let conversation = null;
    if (userData.conversations) {
        conversation = _.findWhere(userData.conversations, {id: userData.currentConversationId});
    }

    return {
        users: userData.users,
        conversation: conversation,
        translation: state.translation
    };
}

export default connect(mapStateToProps)(MessageList);