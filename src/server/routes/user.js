'use strict';
var express = require('express');
var db = require('../db');
var SessionManager = require('../session-manager');

var router = express.Router();

router.use(function (req, res, next) {
    if (req.body.sessionId) {
        req.session = SessionManager.getSessionById(req.body.sessionId);
    }
    next();
});

router.post('/login', function (req, res) {
    var user = db.getUserByName(req.body.userName);
    var sessionId = SessionManager.createSession(user);

    res.send({
        status: "OK",
        sessionId: sessionId
    });
});

router.post('/logout', function (req, res) {
    SessionManager.destroySession(req.body.sessionId);

    res.send({
        status: "OK"
    });
});

router.post('/getUserData', function (req, res) {
    if (req.session) {
        var userId = req.session.user.id;

        var userData = {};
        userData.self = req.session.user;
        userData.conversations = db.getConversationsForUserId(userId);
        userData.users = db.getUsersForConversations(userData.conversations);

        res.send({
            status: "OK",
            data: userData
        });
    }
    else {
        console.log("Invalid session");
        res.send({
            status: "INVALID_SESSION"
        });
    }
});

module.exports = router;