
'use strict';

module.exports = function (conn) {
    return {
        identity: 'usermessages',
        connection: conn,
        attributes: {
            author: {
                model: 'users'
            },

            message: {
                model: 'messages'
            }
        }
    };
};
