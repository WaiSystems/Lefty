import React from 'react';
import { connect } from 'react-redux'

import Chat from '../components/Chat.jsx'
import Login from '../components/Login.jsx'
import { loginUser } from '../actions/login.js'

class App extends React.Component {
    render() {
        const { dispatch, login } = this.props;

        if (login == "") {
            return (
                <Login onLogin = { userName =>
                    dispatch(loginUser(userName))
                } />
            )
        }

        return (
            <Chat userName = {login} />
        )
    }
}

function select(state) {
    return state;
}

export default connect(select)(App)