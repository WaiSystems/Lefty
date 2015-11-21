import React from 'react';
import { connect } from 'react-redux';
import { Layout, Header, Navigation, HeaderRow, Drawer, Content, Icon} from 'react-mdl';

import Chat from './Chat.jsx'
import Login from '../components/Login.jsx'
import Loading from '../components/Loading.jsx'
import { loginUser } from '../actions/login.js'

import * as UserApi from '../utils/UserApi'

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
            <Layout fixedHeader={true}>
                <Header>
                    <HeaderRow title="Lefty">
                        <Navigation>
                            <a href="#">Logout</a>
                        </Navigation>
                    </HeaderRow>
                </Header>
                <Drawer title={login.userName}>
                    <Navigation>
                        <a href="#">Help</a>
                    </Navigation>
                </Drawer>
                <Content style={{position:"relative"}}>
                    <Chat />
                </Content>
            </Layout>
        )
    }
}

function select(state) {
    return state;
}

export default connect(select)(App)