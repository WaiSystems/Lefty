import fetch from 'isomorphic-fetch'

export function loginUser(userName) {
    return fetch('/user/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userName
        })
    })
        .then(req => req.json());
}