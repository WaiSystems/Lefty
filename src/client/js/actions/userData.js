'use strict';
import * as UserApi from '../utils/UserApi';

export function requestUserData(sessionId) {
    return {
        type: 'requestUserData',
        sessionId: sessionId
    };
}

export function receiveUserData(userData) {
    return {
        type: 'receiveUserData',
        userData: userData
    };
}

export function fetchUserData(sessionId) {
    return dispatch => {
        dispatch(requestUserData(sessionId));

        UserApi.fetchUserData(sessionId)
            .then(json =>
                dispatch(receiveUserData(json.data))
            )
    }
}