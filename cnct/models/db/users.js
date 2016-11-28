'use strict';

module.exports = function (conn) {
    return {
        identity: 'users',
        connection: conn,
        attributes: {
            name: 'string',
            email: { type: 'string', required: true, unique: true, index: true },
            password: { type: 'string', required: true },
            secret: 'string',
            avatar: 'string',
            facebookId: 'string',
            sex: 'string',
            token: 'string',
            messages: {
                collection: 'messages',
                via: 'message',
                through: 'usermessages'
            },
            likes: {
                collection: 'likes',
                via: 'user'
            }
        }
    };
};
