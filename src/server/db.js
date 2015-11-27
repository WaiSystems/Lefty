'use strict';
const _ = require('lodash');
const low = require('lowdb');

let db = low(__dirname + '/data/db.json', {
    autosave: false
});

exports.getUserByName = function (userName) {
    let usersList = db('users');
    let user = usersList.find({name: userName});
    if (user) {
        console.log('Found an existing user: ' + userName);
        return user;
    }

    // Auto create a new user
    console.log('Creating a new user: ' + userName);

    const nextUserId = usersList.last().id + 1;
    user = {
        id: nextUserId,
        name: userName,
        displayName: userName
    };

    usersList.push(user);
    return user;
};

exports.getConversationsForUserId = function(userId) {
    return db('conversations').filter(function(conv) {
        return _.contains(conv.users, userId);
    });
};

exports.getUsersForConversations = function(conversations, excludeUserId) {
    // Get the user ids lists from the conversations list
    var userIds = _.chain(conversations)
        .pluck('users')
        .value();

    // Combine the user ids into a one, unique, array
    userIds = _.union.apply(null, userIds);

    // Exclude "excludeUserId" from the user ids, if needed
    if (excludeUserId !== undefined) {
        userIds = _.reject(userIds, function(userId) {
            return excludeUserId == userId;
        });
    }

    // Get the users with our user ids
    const users = db('users').filter(function(user) {
        return _.contains(userIds, user.id);
    });

    return users;
};

exports.getConversationById = function(id) {
    return db('conversations').findWhere({id: id});
};
