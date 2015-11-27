import React from 'react';
import { connect } from 'react-redux'

import Loading from '../components/Loading.jsx'
import MessageSection from '../containers/MessageSection.jsx'
import ConversationSection from '../containers/ConversationSection.jsx'
import "../../css/chat.css";
import { fetchUserData } from '../actions/userData'
import SessionSocket from '../utils/SessionSocket.js'

import * as UserApi from '../utils/UserApi'

class Chat extends React.Component {
    componentDidMount() {
        const {dispatch, userData, login} = this.props;

        dispatch(fetchUserData(login.sessionId));
        SessionSocket.connect(dispatch, login.sessionId);
    }

  render() {
    const { dispatch, userData, login } = this.props;

    if (userData.isFetching) {
      return <Loading message = "Loading"/>
    }

    return (
        <div className="chat">
            <ConversationSection/>
            <MessageSection/>
        </div>
    )
  }
}

function select(state) {
  return state;
}

export default connect(select)(Chat)