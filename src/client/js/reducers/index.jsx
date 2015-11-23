import update from 'react-addons-update'
import { combineReducers } from 'redux'
import * as _ from 'lodash';

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
    conversations: [],
    currentConversationId : 0
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
                conversations: action.userData.conversations,
                currentConversationId: action.userData.self.lastOpenConversation
            });

        case "loggedOut":
            return initialUserDataState;

        case "createMessage" :
            var currentConversationIndex = _.findIndex(state.conversations, {id: state.self.lastOpenConversation});
            return update(state, {
                conversations: {
                    [currentConversationIndex]: {
                        messages: {$push: [action.message]}
                    }
                }
            });

        case "selectConversation" :
            return Object.assign({}, state, {
                currentConversationId: action.conversationId
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