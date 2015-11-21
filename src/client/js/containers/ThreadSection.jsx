import React from 'react';

import ThreadList from './ThreadList.jsx'
import "../../css/chat.css";

export default class ThreadSection extends React.Component {
    render() {
        return (
            <div className="thread-section">
                <ThreadList/>
            </div>
        )
    }
}