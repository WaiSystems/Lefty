import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import App from './containers/App.jsx'
import chatReducer from './reducers/index.jsx'
import { renderDevTools, createDevStore } from './utils/DevTools.js'

import 'react-mdl/extra/material'
import 'react-mdl/extra/material.css'

let finalCreateStore = __DEV__ ? createDevStore : createStore;

const store = finalCreateStore(chatReducer);

ReactDOM.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>

        {renderDevTools(store)}
    </div>,
    document.getElementById('root')
);