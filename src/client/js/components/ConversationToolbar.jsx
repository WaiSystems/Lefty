'use strict';
import React from 'react';
import { FABButton, Icon } from 'react-mdl';

import '../../css/conversationSection.css';

export default class ConversationToolbar extends React.Component {
    render() {
        return (
            <div className="conversation-toolbar">
                <div>
                    <FABButton mini ripple primary>
                        <Icon name="add" />
                    </FABButton>
                </div>
            </div>
        )
    }
}