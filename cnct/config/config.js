'use strict';

module.exports = () => {
    return {
        db: {
            adapter: 'sails-memory',
            server: 'localhost',
            port: '5432',
            username: 'cnctuser',
            password: 'Crap1PazZw0rd',
            database: 'cnctdb',
            migrate: 'drop',
            poolSize: 10,
            ssl: true
        },
        project: {
            port: 8989
        }
    };
};
