'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { Layout, Header, Navigation, HeaderRow, Drawer, Content, Icon } from 'react-mdl';
import classnames from 'classnames';

import Chat from './Chat.jsx';
import Login from '../components/Login.jsx';
import Loading from '../components/Loading.jsx';
import { loginUser, logoutUser } from '../actions/login.js';
import { clearSelectedTextForTranslation } from '../actions/translation';
import '../../css/app.css';

import * as UserApi from '../utils/UserApi'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this._onLogout = this._onLogout.bind(this);
        this._onLayoutMouseDown = this._onLayoutMouseDown.bind(this);
    }

    render() {
        const {dispatch, login, userData, translation} = this.props;

        if (login.isLoginInProgress) {
            return <Loading message="Logging in" />
        }

        if (login.isLogoutInProgress) {
            return <Loading message="Logging out" />
        }

        if (login.userName == "") {
            return (
                <Login onLogin={(userName) => dispatch(loginUser(userName))} />
            )
        }

        return (
            <Layout
                fixedHeader={true}
                className={classnames({
                    'not-selectable': translation.isUserSelectingText
                })}
                onMouseDown={this._onLayoutMouseDown}
            >
                <Header>
                    <HeaderRow title="Lefty">
                        <Navigation>
                            <a href="#" onClick={(e) => this._onLogout(e)}>
                                Logout
                            </a>
                        </Navigation>
                    </HeaderRow>
                </Header>
                <Drawer title={userData.self.displayName}>
                    <Navigation>
                        <a href="#">
                            <Icon name="help" className="navigation-link-item" />
                            <span className="navigation-link-item">
                                &nbsp;Help
                            </span>
                        </a>
                    </Navigation>
                </Drawer>
                <Content style={{position:"relative"}}>
                    <Chat />
                </Content>
            </Layout>
        )
    }

    _onLogout(event) {
        event.preventDefault();
        this.props.dispatch(logoutUser(this.props.login.sessionId));
    }

    _onLayoutMouseDown(event) {
        this.props.dispatch(clearSelectedTextForTranslation());
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);