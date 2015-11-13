import React from 'react';
import { createStore, compose } from 'redux'

export function renderDevTools(store) {
    if (__DEV__) {
        let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react');
        return (
            <DebugPanel top right bottom>
                <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        );
    }

    return null;
}

export const createDevStore = compose(
    require('redux-devtools').devTools(),
    require('redux-devtools').persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);