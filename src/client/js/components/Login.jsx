import React from 'react';
import "../../css/login.css";

export default class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <input type='text' ref='userName' />
                <button onClick={(e) => this.handleClick(e)}>
                    Login
                </button>
            </div>
        )
    }

    handleClick(e) {
        const userName = this.refs.userName.value.trim();
        this.props.onLogin(userName);
    }
}