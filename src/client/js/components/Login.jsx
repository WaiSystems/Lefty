import React from 'react';
import { Button, Textfield } from 'react-mdl';

import "../../css/login.css";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ""
        }
    }
    render() {
        return (
            <div className="login">
                <div className="login-item-container">
                    <Textfield
                        type="text"
                        label="Please enter you name..."
                        onChange={ (e) => this.setState({userName: e.target.value})}
                    />
                </div>
                <div className="login-item-container">
                    <Button
                        ripple={true}
                        onClick={(e) => this.props.onLogin(this.state.userName)}>
                            Login
                    </Button>
                </div>
            </div>
        )
    }
}