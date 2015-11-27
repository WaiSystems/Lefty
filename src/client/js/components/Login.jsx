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

        this.onInputKeyDown = this.onInputKeyDown.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    render() {
        return (
            <div className="login">
                <div className="login-item-container">
                    <Textfield
                        type="text"
                        label="Please enter you name..."
                        onChange={(e) => this.setState({userName: e.target.value})}
                        onKeyPress={this.onInputKeyDown}
                    />
                </div>
                <div className="login-item-container">
                    <Button
                        ripple={true}
                        onClick={(e) => this.submitLogin()}>
                            Login
                    </Button>
                </div>
            </div>
        )
    }

    onInputKeyDown(event) {
        if (event.key == 'Enter') {
            this.submitLogin();
        }
    }

    submitLogin() {
        this.props.onLogin(this.state.userName);
    }
}