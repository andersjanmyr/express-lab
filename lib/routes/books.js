'use strict';

var express = require('express');
var router = express.Router();

var book = require('../models/book.js');

router.get('/', function(req, res) {
    book.find(req.query.filter, function(err, books) {
        if (err)
            return res.status(500).send(err);
        return res.send(books);
    });
});

router.get('/:id', function(req, res) {
    book.findById(req.params.id, function(err, book) {
        if (err)
            return res.status(404).send(err);
        return res.send(book);
    });
});

router.post('/', function(req, res) {
    book.add(req.body, function(err, id) {
        if (err)
            return res.status(500).send(err);
        return res.status(201).json(id);
    });
});

router.put('/:id', function(req, res) {
    req.body.id = req.param('id');
    book.update(req.body, function(err, book) {
        if (err)
            return res.status(404).send(err);
        return res.send(book);
    });
});

router.delete('/:id', function(req, res) {
    book.remove(req.param('id'), function(err, book) {
        if (err)
            return res.status(404).send(err);
        return res.send(book);
    });
});


module.exports = router;



