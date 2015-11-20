import { combineReducers } from 'redux'

const initialLoginState = {
    userName: "",
    isInProgress: false,
    sessionId: ""
};

const initialUserDataState = {
    isFetching: false,
    users: {},
    conversations: []
};

function login(state = initialLoginState, action)  {
    switch (action.type) {
        case "loggingIn":
            return Object.assign({}, state, {
                userName: action.user,
                isInProgress: true
            });

        case "loggedIn":
            return Object.assign({}, state, {
                sessionId: action.sessionId,
                isInProgress: false
            });

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
                users: action.userData.users,
                conversations: action.userData.conversations
            });

        default:
            return state
    }
}

const chatReducer = combineReducers({
    login,
    userData
});

export default chatReducer;