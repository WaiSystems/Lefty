'use strict';
import React from 'react';

import ConversationList from './ConversationList.jsx';
import '../../css/chat.css';

export default class ConversationSection extends React.Component {
    render() {
        return (
            <div className="conversation-section">
                <ConversationList/>
            </div>
        )
    }
}