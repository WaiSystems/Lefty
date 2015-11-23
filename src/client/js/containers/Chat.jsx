import React from 'react';
import { connect } from 'react-redux'

import Loading from '../components/Loading.jsx'
import MessageSection from '../containers/MessageSection.jsx'
import ConversationSection from '../containers/ConversationSection.jsx'
import "../../css/chat.css";
import { fetchUserData } from '../actions/userData'

import * as UserApi from '../utils/UserApi'

class Chat extends React.Component {
    componentDidMount() {
       this.props.dispatch(fetchUserData(this.props.login.sessionId));
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