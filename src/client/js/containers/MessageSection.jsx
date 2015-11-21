import React from 'react';

import MessageComposer from '../components/MessageComposer.jsx'
import MessageList from './MessageList.jsx'
import "../../css/chat.css";

export default class MessageSection extends React.Component {
    render() {
        return (
            <div className="message-section">
                <MessageList/>
                <MessageComposer onMessage = { message => {
                    console.log(message);
                    }
                } />
            </div>
        )
    }
}