'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import MessageItem from '../components/MessageItem.jsx';
import '../../css/messageSection.css';

class MessageList extends React.Component {
    componentDidMount() {
        this._scrollToBottom();
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
        const messageItems = this.props.conversation.messages.map(function(message) {
            return (
                <MessageItem key={message.id} message={{
                    user: _.findWhere(users, {id: message.from}),
                    timestamp: message.timestamp,
                    text: message.text
                }}
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
}

function select(state) {
    const userData = state.userData;

    let conversation = null;
    if (userData.conversations) {
        conversation = _.findWhere(userData.conversations, {id: userData.currentConversationId});
    }

    return {
        users: userData.users,
        conversation : conversation
    };
}

export default connect(select)(MessageList);