import * as UserApi from '../utils/UserApi'

export function loggedIn(userName) {
    return {
        type: "loggedIn",
        user: userName
    };
}

export function loggingIn(userName) {
    return {
        type: "loggingIn",
        user: userName
    };
}

export function loginUser(userName) {
    return dispatch => {
        dispatch(loggingIn(userName));

        UserApi.loginUser(userName)
            .then(json =>
                dispatch(loggedIn(userName))
            )
    }
}