import { combineReducers } from 'redux'

const initialLoginState = {
    userName: "",
    isLoginInProgress: false,
    isLogoutInProgress: false,
    sessionId: ""
};

const initialUserDataState = {
    isFetching: false,
    self: {},
    users: {},
    conversations: []
};

function login(state = initialLoginState, action)  {
    switch (action.type) {
        case "loggingIn":
            return Object.assign({}, state, {
                userName: action.user,
                isLoginInProgress: true
            });

        case "loggedIn":
            return Object.assign({}, state, {
                sessionId: action.sessionId,
                isLoginInProgress: false
            });

        case "loggingOut":
            return Object.assign({}, state, {
                isLogoutInProgress: true
            });

        case "loggedOut":
            return initialLoginState;

        default:
            return state
    }
}

function userData(state = initialUserDataState, action)  {
    switch (action.type) {
        case "requestUserData":
            return Object.assign({}, state, {
                isFetching: true
            });

        case "receiveUserData":
            return Object.assign({}, state, {
                isFetching: false,
                self: action.userData.self,
                users: action.userData.users,
                conversations: action.userData.conversations
            });

        case "loggedOut":
            return initialUserDataState;

        default:
            return state
    }
}

const chatReducer = combineReducers({
    login,
    userData
});

export default chatReducer;