import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import * as _ from 'lodash';

import 'react-mdl/extra/material'
import 'react-mdl/extra/material.css'

import App from './containers/App.jsx'
import { renderDevTools } from './utils/DevTools.js'
import {configureStore} from './store'

const store = configureStore();

// Update the page's title when the user logs in\out
store.subscribe(() => {
    const userDisplayName = _.get(store.getState(), 'userData.self.displayName', null);
    //console.log(JSON.stringify(store));
    if (userDisplayName) {
        document.title = 'Lefty - ' + userDisplayName;
    } else {
        document.title = 'Lefty';
    }
});

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>

        {renderDevTools(store)}
    </div>,
    document.getElementById('root')
);