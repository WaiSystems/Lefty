'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { createDevStore } from '../utils/DevTools.js';
import chatReducer from '../reducers/index.jsx';

const middleware = [ thunk ];

export function configureStore() {
    let finalCreateStore;
    if (__DEV__) {
        finalCreateStore = applyMiddleware(...middleware)(createDevStore);
    } else {
        finalCreateStore = applyMiddleware(...middleware)(createStore);
    }

    return finalCreateStore(chatReducer);
}