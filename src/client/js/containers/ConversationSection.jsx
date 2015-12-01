'use strict';
import React from 'react';

import ConversationList from './ConversationList.jsx';
import ConversationToolbar from '../components/ConversationToolbar.jsx';
import '../../css/chat.css';

export default class ConversationSection extends React.Component {
    render() {
        return (
            <div className="conversation-section">
                <ConversationList/>
                <ConversationToolbar/>
            </div>
        )
    }
}