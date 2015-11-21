import * as UserApi from '../utils/UserApi'

export function loggedIn(userName, sessionId) {
    return {
        type: "loggedIn",
        user: userName,
        sessionId: sessionId
    };
}

export function loggingIn(userName) {
    return {
        type: "loggingIn",
        user: userName
    };
}

export function loggedOut(userName, sessionId) {
    return {
        type: "loggedOut"
    };
}

export function loggingOut(userName) {
    return {
        type: "loggingOut"
    };
}

export function loginUser(userName) {
    return dispatch => {
        dispatch(loggingIn(userName));

        UserApi.loginUser(userName)
            .then(json =>
                dispatch(loggedIn(userName, json.sessionId))
            )
    }
}

export function logoutUser(sessionId) {
    return dispatch => {
        dispatch(loggingOut());

        UserApi.logoutUser(sessionId)
            .then(json =>
                dispatch(loggedOut())
            )
    }
}