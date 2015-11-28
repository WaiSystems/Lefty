'use strict';
import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import ConversationItem from '../components/ConversationItem.jsx';
import { selectConversation } from '../actions/conversation.js';
import '../../css/conversationSection.css';

class ConversationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this._onConversationClick = this._onConversationClick.bind(this);
    }

    render() {
        const users = this.props.users;
        const conversationItems = this.props.conversations.map((conversation) => {
            // Get the conversation's user list, excluding our user
            const conversationUsers = _.reject(conversation.users, (userId) => {
                return userId == this.props.selfUserId;
            });

            // Get the users' display names, used to build the conversation's name
            const conversationUserDisplayNames = conversationUsers.map((userId) => {
                return _.findWhere(users, {id: userId}).displayName;
            });

            // Build the conversation's details needed to render it's item
            const conversationName = conversationUserDisplayNames.join(', ');
            const lastMessage = _.last(conversation.messages);
            const lastMessageUser = _.findWhere(users, {id: lastMessage.from});
            const isOpen = conversation.id == this.props.currentConversationId;

            return (
                <ConversationItem
                    key={conversation.id}
                    id={conversation.id}
                    name={conversationName}
                    lastMessageInformation={{
                        message: lastMessage,
                        user: lastMessageUser
                    }}
                    isOpen={isOpen}
                    onClick={this._onConversationClick}
                />
            );
        });

        return (
            <ul className="conversation-list">
                {conversationItems}
            </ul>
        )
    }

    _onConversationClick(conversationId) {
        if (conversationId != this.props.currentConversationId) {
            this.props.dispatch(selectConversation(conversationId));
        }
    }
}

function mapStateToProps(state) {
    const userData = state.userData;

    return {
        selfUserId: userData.self.id,
        users: userData.users,
        conversations : userData.conversations,
        currentConversationId: userData.currentConversationId
    }
}

export default connect(mapStateToProps)(ConversationList);