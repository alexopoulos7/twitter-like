'use strict';
const orm = require('../models');
const nodemailer = require('nodemailer');

module.exports = (req, res) => {
    if (req.body.email.text && req.body.email.subject && req.body.email.to) {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'cncttrial@gmail.com',
                pass: 'test0601'
            }
        });
        let mailOptions = {
            from: 'alexopoulos@trial.chaser.com',
            to: req.body.email.to,
            subject: 'Hey you, awesome!',
            html: req.body.email.htmlText,
            text: req.body.email.text
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send({ status: 'Message sent to ' + req.body.email.to });
            };
        });

    }
}