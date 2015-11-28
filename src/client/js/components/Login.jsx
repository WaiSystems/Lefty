'use strict';
import React from 'react';
import { Button, Textfield } from 'react-mdl';

import '../../css/login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        };

        this._onInputKeyDown = this._onInputKeyDown.bind(this);
        this._submitLogin = this._submitLogin.bind(this);
    }
    render() {
        return (
            <div className="login">
                <div className="login-item-container">
                    <Textfield
                        type="text"
                        label="Please enter you name..."
                        onChange={(e) => this.setState({userName: e.target.value})}
                        onKeyPress={this._onInputKeyDown}
                    />
                </div>
                <div className="login-item-container">
                    <Button
                        ripple={true}
                        onClick={(e) => this._submitLogin()}>
                            Login
                    </Button>
                </div>
            </div>
        )
    }

    _onInputKeyDown(event) {
        if (event.key == 'Enter') {
            this._submitLogin();
        }
    }

    _submitLogin() {
        this.props.onLogin(this.state.userName);
    }
}