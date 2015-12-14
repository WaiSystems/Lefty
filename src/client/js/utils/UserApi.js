'use strict';
import fetch from 'isomorphic-fetch';

function fetchFromServer(url, body) {
    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

export function loginUser(userName) {
    return fetchFromServer('/user/login', {
        userName: userName
    }).then(res => res.json());
}

export function logoutUser(sessionId) {
    return fetchFromServer('/user/logout', {
        sessionId: sessionId
    }).then(res => res.json());
}

export function fetchUserData(sessionId) {
    return fetchFromServer('/user/getUserData', {
        sessionId: sessionId
    }).then(res => res.json());
}