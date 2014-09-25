var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');
var routes = require('../../lib/routes/status');

var app = express();
app.use('/status', routes);

describe('GET /status', function() {
    before(function() {
        // sinon.spy(Model, 'generate');
    });

    it('responds with health good', function(done) {
        request(app)
            .get('/status')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                expect(res.body.health).to.equal('good');
                done();
            });
    });

    after(function() {
        // Model.generate.restore();
    });
});

