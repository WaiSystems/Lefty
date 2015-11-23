import React from 'react';
import { connect } from 'react-redux'
import * as _ from 'lodash';

import ConversationItem from '../components/ConversationItem.jsx'
import {selectConversation} from '../actions/conversation.js'
import "../../css/conversationSection.css";

class ConversationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onConversationClick = this.onConversationClick.bind(this);
    }

    render() {
        const users = this.props.users;
        const converstionList = this;

        var conversationItems = this.props.conversations.map(function(conversation) {
            const conversationUsers = _.reject(conversation.users, function(userId) {
                return userId == converstionList.props.selfUserId;
            });

            const conversationUserDisplayNames = conversationUsers.map(function(userId) {
                return _.findWhere(users, {id: userId}).displayName;
            });

            const conversationName = conversationUserDisplayNames.join(', ');
            const lastMessage = _.last(conversation.messages);
            const lastMessageUser = _.findWhere(users, {id: lastMessage.from});
            const isOpen = conversation.id == converstionList.props.currentConversationId;

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
                    onClick={converstionList.onConversationClick}
                />
            );
        });

        return (
            <ul className="conversation-list">
                {conversationItems}
            </ul>
        )
    }

    onConversationClick(conversationId) {
        if (conversationId != this.props.currentConversationId) {
            this.props.dispatch(selectConversation(conversationId));
        }
        console.log("conversation click " + conversationId);
    }
}

function select(state) {
    const userData = state.userData;

    return {
        selfUserId: userData.self.id,
        users: userData.users,
        conversations : userData.conversations,
        currentConversationId: userData.currentConversationId
    }
}

export default connect(select)(ConversationList)