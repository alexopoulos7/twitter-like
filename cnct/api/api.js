'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cfg = require('../config/config.js')();
// We need our db too
const models = require('../models');
//basic authentication utility
const auth = require('../utilities/auth.js');
const register = require('../routers/register.js');
const login = require('../routers/login.js');
const sendMail = require('../routers/emailNotification.js');

const app = express(); // define our app using express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = cfg.project.port || 8989; // set our port
const router = express.Router(); // get an instance of the express Router

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Initialize waterline
if (!models.waterline.connections) {
    models.waterline.initialize(models.config, function (err, models) {
        if (err) {
            throw err;
        }
        app.models = models.collections;
        app.connections = models.connections;
    });
} else {
    app.models = models.collections;
    app.connections = models.connections;
}

/**
 * Unauthorized Router that registers new users
 */
app.post('/register', (req, res) => {
    return register(req, res);
});
app.post('/send-email', (req, res) => {
    return sendMail(req, res);
})
app.use(auth);

app.post('/login', (req, res) => {
    return login(req, res);
});

// Generic routing that need Basic Authentication
app.all('/api/*/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let component = req.params['0'];
    console.log('Component ' + component);
    let modelname = component.replace(/\/[a-zA-Z0-9]+$/, '');
    let method = req.method.toLowerCase();
    let model;
    try {
        model = require(path.join(__dirname, '../routers', modelname + '-id.js')); // Loads any specific router model if any
    } catch (err) {
        model = require(path.join(__dirname, '../routers', 'generic.js')); // Loads the generic one
    }
    try {
        model[method](req, ret => {
            res.status(ret.status).send(ret.result);
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

});

app.all('/api/*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let component = req.params['0'];
    console.log('Requested Component is ' + component);
    console.log('Headers ' + JSON.stringify(req.headers));
    let method = req.method.toLowerCase();
    let model;
    try {
        model = require(path.join(__dirname, '../routers', component + '.js'));
    } catch (err) {
        model = require(path.join(__dirname, '../routers', 'generic.js')); // Loads the generic one
    }
    try {
        model[method](req, ret => {
            res.status(ret.status).send(ret.result);
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// REGISTER OUR ROUTES -------------------------------

// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
