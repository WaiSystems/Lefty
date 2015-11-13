import { combineReducers } from 'redux'

function login(state = "", action)  {
    switch (action.type) {
        case "login":
            return action.user;
        default:
            return state
    }
}

const chatReducer = combineReducers({
    login
});

export default chatReducer;