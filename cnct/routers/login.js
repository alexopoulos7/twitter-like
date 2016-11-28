'use strict';
const orm = require('../models'); // Initialize our waterline orm
const validate = require('../utilities/validation');
module.exports = (req, res) => {
    if (req.body.email && req.body.password) {
        if (!validate(req.body.email)) {
            return res.status(500).send('This is not a valid email');
        }
        let db = orm.waterline.collections['users']; // get the table
        let exits = db.find({ email: req.body.email }).exec((err, user) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (user && user.length) {
                console.log('Existing user ' + JSON.stringify(user));
                return res.status(200).send(user[0]);
            }
            else {
                console.log('User was not found');
                return res({ status: 500, result: 'User was not found' });

            }
        });
    }
    else {
        return res.status(500).send('Please provide both email and password');
    }
}