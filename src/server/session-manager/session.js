'use strict';

module.exports = class Session {
    constructor(id, user) {
        this._id = id;
        this._user = user;
        this._socket = null;
    }

    get id() {
        return this._id;
    }

    get user() {
        return this._user;
    }

    get socket() {
        return this._socket;
    }
    set socket(sock) {
        this._socket = sock;
    }
};
