'use strict';

module.exports = function(conn) {
    return {
        identity: 'messages',
        connection: conn,
        attributes: {
            text: 'string',
            parent: {
                type: 'integer',
                index: true,
                defaultsTo: 0
            },
            users: {
                collection: 'users',
                via: 'user',
                through: 'usermessages'
            },
            likes: {
                collection: 'likes',
                via: 'message',
                index: true
            }
        }
    };
};
