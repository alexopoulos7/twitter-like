'use strict';

const basicAuth = require('basic-auth');
const orm = require('../models'); // Initialize our waterline orm

// Basic authentication
module.exports = (req, res, next) => {
    console.log('Login Request ' + JSON.stringify(req.body) + JSON.stringify(req.headers));
    let unauthorized = (res) => {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    };

    let user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    };

    let db = orm.waterline.collections['users']; // get the table
    db.find({ email: user.name, password: user.pass }).exec((err, user) => {
        console.log(err, user);
        if (err || !user || user.length === 0) {
            return unauthorized(res);
        }
        return next();
    });
};