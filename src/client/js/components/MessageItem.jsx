'use strict';
import React from 'react';

import '../../css/messageItem.css';

export default class MessageItem extends React.Component {
    render() {
        const message = this.props.message;
        return (
            <li className="message-item">
                <h5 className="message-user-name">
                    {message.user.displayName}
                </h5>
                <div className="message-time">
                    {new Date(message.timestamp).toLocaleString()}
                </div>
                <div className="message-text" dir="auto">
                    {message.text}
                </div>
            </li>
        );
    }
}