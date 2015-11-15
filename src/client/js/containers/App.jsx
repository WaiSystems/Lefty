import React from 'react';
import { connect } from 'react-redux'

import Chat from '../components/Chat.jsx'
import Login from '../components/Login.jsx'
import Loading from '../components/Loading.jsx'
import { loginUser } from '../actions/login.js'

class App extends React.Component {
    render() {
        const { dispatch, login } = this.props;

        if (login.isInProgress) {
            return <Loading message = "Logging in" />
        }

        if (login.userName == "") {
            return (
                <Login onLogin = { userName => {
                    dispatch(loginUser(userName))
                    }
                } />
            )
        }

        return (
            <Chat userName = {login.userName} />
        )
    }
}

function select(state) {
    return state;
}

export default connect(select)(App)