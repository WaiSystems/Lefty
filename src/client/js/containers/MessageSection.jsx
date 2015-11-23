import React from 'react';
import { connect } from 'react-redux'

import MessageComposer from '../components/MessageComposer.jsx'
import MessageList from './MessageList.jsx'
import { createMessage } from '../actions/messages.js'
import "../../css/chat.css";

class MessageSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onCreateMessage = this.onCreateMessage.bind(this);
    }

    onCreateMessage(messageText) {
        console.log(messageText);

        const userData = this.props.userData;
        const conversation = _.findWhere(userData.conversations, {id: userData.currentConversationId});
        const message = {
            id: _.last(conversation.messages).id + 1,
            from: userData.self.id,
            timestamp: Date.now(),
            text: messageText
        };

        this.props.dispatch(createMessage(message));
    }

    render() {
        return (
            <div className="message-section">
                <MessageList/>
                <MessageComposer onMessage={this.onCreateMessage} />
            </div>
        )
    }
}

function select(state) {
    return state;
}

export default connect(select)(MessageSection)