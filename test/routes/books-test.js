var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var express = require('express');
var bodyParser = require('body-parser');

var booksRouter = require('../../lib/routes/books');
var book = require('../../lib/models/book.js');

var app = express();
app.use(bodyParser.json());
app.use('/books', booksRouter(book));

describe('GET /books?filter=fooled', function() {
    it('responds with matching books', function(done) {
        request(app)
            .get('/books?filter=fooled')
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.length).to.equal(1);
                expect(res.body.length).to.equal(1);
                done();
            });
    });
});

describe('GET /books/geb', function() {
    it('responds with matching book', function(done) {
        request(app)
            .get('/books/geb')
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.title).to.match(/Gödel/);
                done();
            });
    });
});

describe('POST /books', function() {
    it('adds the new book', function(done) {
        request(app)
            .post('/books')
            .send({author: 'fake', title: 'Fakebook swims!'})
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body).to.equal('fas');
                done();
            });
    });
});

describe('PUT /books/fbr', function() {
    it('responds with matching book', function(done) {
        request(app)
            .put('/books/fbr')
            .send({title: 'Fakebook rocks!'})
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.title).to.match(/Fakebook/);
                done();
            });
    });
});

describe('DELETE /books/fbr', function() {
    it('responds with matching book', function(done) {
        request(app)
            .delete('/books/fbr')
            .end(function(err, res){
                if (err) throw err;
                expect(res.get('content-type')).to.match(/json/);
                expect(res.body.title).to.match(/Fakebook/);
                done();
            });
    });
});

