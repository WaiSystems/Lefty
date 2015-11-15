import { combineReducers } from 'redux'

const initialLoginState = {
    userName: "",
    isInProgress: false
};

function login(state = initialLoginState, action)  {
    switch (action.type) {
        case "loggingIn":
            return {userName: action.user,isInProgress: true };
        case "loggedIn":
            return {userName: action.user,isInProgress: false };
        default:
            return state
    }
}

const chatReducer = combineReducers({
    login
});

export default chatReducer;