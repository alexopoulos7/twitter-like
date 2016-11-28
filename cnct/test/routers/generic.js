'use strict';
/*globals it, describe*/
/*exported should*/
let should = require('should');
let generic = require('../../routers/generic.js'); //jshint ignore:line

let req = {
    query: {
        params: JSON.stringify({ limit: 10 })
    },
    params: { '0': 'users' }
};

describe('Generic Router Test', function () {

    it('Testing GET', function (done) {
        generic.get(req, res => {
            res.status.should.be.equal(200);
            done();
        });
    });
    it('Testing GET id', function (done) {
        req.id = 1;
        generic.get(req, res => {
            res.status.should.be.equal(200);
            done();
        });
    });
    it('Testing POST', function (done) {
        req.body = {
            'user': { email: 'a@a.com', password: '123' }
        };
        generic.post(req, res => {
            console.log('status from post is ' + JSON.stringify(res));
            res.status.should.be.equal(200);
            res.result.users.password.should.be.equal('123');
            res.result.users.email.should.be.equal('a@a.com');
            done();
        });
    });
    it('Testing PUT', function (done) {
        req.body = {
            'user': { email: 'b@b.com', password: '222' }
        }
        generic.post(req, res => {
            req.body = {
                'user': { 'id': 1, 'name': 'newtest', email: 'a@a.com', password: '123' }
            };
            req.id = 1;
            generic.put(req, res => {
                res.status.should.be.equal(200);
                res.result.users[0].name.should.be.equal('newtest');
                //res.result.testmodel[0].email.should.be.equal('a@a.com');
                done();
            });
        })

    });
    it('Testing DELETE', function (done) {
        req.id = 1;
        generic.delete(req, res => {
            res.status.should.be.equal(200);
            done();
        });
    });
});
