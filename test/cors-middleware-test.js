var request = require('supertest');
var expect = require('chai').expect;

var express = require('express');
var corsMiddleware = require('../lib/cors-middleware');

var app = express();
app.use(corsMiddleware);

describe('GET /', function() {
    it('has a CORS header set', function(done) {
        request(app)
            .get('/')
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('Access-Control-Allow-Origin')).to.equal('*');
                done();
            });
    });
});

