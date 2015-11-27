'use strict';
import React from 'react';
import classnames from 'classnames';

import '../../css/conversationItem.css';

export default class ConversationItem extends React.Component {
    render() {
        const {id, name, lastMessageInformation, isOpen} = this.props;

        return (
            <li
                className={classnames({
                    'conversation-item': true,
                    'active': isOpen
                })}
                onClick={(e) => this.props.onClick(id)}
            >
                <div className="conversation-item-name">
                    {name}
                </div>
                <div className="conversation-item-time">
                    {new Date(lastMessageInformation.message.timestamp).toLocaleString()}
                </div>
                <div className="conversation-item-last-message">
                    {lastMessageInformation.user.displayName}: {lastMessageInformation.message.text}
                </div>
            </li>
        );
    }
}