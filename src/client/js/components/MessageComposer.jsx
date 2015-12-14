'use strict';
import React from 'react';
import { Textfield } from 'react-mdl';

import '../../css/messageSection.css';
import '../../css/messageComposer.css';

export default class MessageComposer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this._onKeyDown = this._onKeyDown.bind(this);
    }

    _onKeyDown(event) {
        if ((event.key == 'Enter') && (false == event.shiftKey)) {
            // Prevent the event from actually going to the textarea (and appending a new line)
            event.preventDefault();

            var message = this.state.message.trim();
            if (message) {
                this.props.onMessage(message);
            }

            this.setState({message: ''});
        }
    }

    render() {
        return (
            <div className="message-composer">
                <textarea className="message-composer-input"
                    value={this.state.message}
                    placeholder="Type your message here..."
                    onChange={(e) => this.setState({message: e.target.value})}
                    onKeyDown={this._onKeyDown}
                />
            </div>
        )
    }
}