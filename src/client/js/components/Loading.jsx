import React from 'react';
import { Spinner } from 'react-mdl';

import "../../css/loading.css";

export default class Loading extends React.Component {
    render() {
        return (
            <div className="loading">
                <h4>{ this.props.message }... </h4>
                <Spinner />
            </div>
        )
    }
}