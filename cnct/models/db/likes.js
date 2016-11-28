'use strict';

module.exports = function(conn) {
    return {
        identity: 'likes',
        connection: conn,
        attributes: {
            user: {
                model: 'users',
                index: true
            },
            message: {
                model: 'messages',
                index: true
            }
        }
    };
};
