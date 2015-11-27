import React from 'react';
import { connect } from 'react-redux'

import MessageComposer from '../components/MessageComposer.jsx'
import MessageList from './MessageList.jsx'
import { createMessage } from '../actions/messages.js'
import SessionSocket from '../utils/SessionSocket.js'
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
        let message = {
            id: "",
            from: userData.self.id,
            timestamp: Date.now(),
            text: messageText
        };

        message.id = message.from.toString() + "_" + message.timestamp.toString();

        this.props.dispatch(createMessage(message));
        SessionSocket.sendMessage(this.props.userData.currentConversationId, message);
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