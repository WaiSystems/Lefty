import React from 'react';
import { connect } from 'react-redux'
import * as _ from 'lodash';

import MessageItem from '../components/MessageItem.jsx'
import "../../css/messageSection.css";

class MessageList extends React.Component {
    render() {
        if (this.props.conversation == null) {
            return (<ul className="message-list" />);
        }

        var users = this.props.users;
        var messageItems = this.props.conversation.messages.map(function(message) {
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
}

function select(state) {
    console.log("Wai");
    const userData = state.userData;

    var conversation = null;
    if (userData.conversations) {
        conversation = _.findWhere(userData.conversations, {id: userData.currentConversationId});
    }

    return {
        users: userData.users,
        conversation : conversation
    };
}

export default connect(select)(MessageList)