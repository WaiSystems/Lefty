import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import 'react-mdl/extra/material'
import 'react-mdl/extra/material.css'

import App from './containers/App.jsx'
import { renderDevTools } from './utils/DevTools.js'
import {configureStore} from './store'

const store = configureStore();

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>

        {renderDevTools(store)}
    </div>,
    document.getElementById('root')
);