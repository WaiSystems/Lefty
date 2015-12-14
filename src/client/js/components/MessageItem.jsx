'use strict';
import React from 'react';
import classnames from 'classnames';

import '../../css/messageItem.css';

export default class MessageItem extends React.Component {
    constructor(props) {
        super(props);

        this._onContentMouseDown = this._onContentMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
    }

    render() {
        const message = this.props.message;

        //TODO: Render the entire message content
        return (
            <li className="message-item">
                <h5 className="message-user-name">
                    {message.user.displayName}
                </h5>
                <div className="message-time">
                    {new Date(message.timestamp).toLocaleString()}
                </div>
                <div
                    className={classnames({
                        'message-text': true,
                        'selectable': this.props.isFocused
                    })}
                    dir="auto"
                    onMouseDown={this._onContentMouseDown}
                >
                    {message.content[0].text}
                </div>
            </li>
        );
    }

    _onContentMouseDown(event) {
        event.stopPropagation();

        window.addEventListener('mouseup', this._onMouseUp);

        console.log("Starting selection");
        this.props.onSelectingContentStarted(this.props.message.id);
    }

    _onMouseUp(nativeEvent) {
        window.removeEventListener('mouseup', this._onMouseUp);

        this.props.onSelectingContentFinished(window.getSelection().toString());
    }
}