var express = require('express');
var router = express.Router();

// Connect to CockroachDB
var async = require('async');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgresql://root@52.60.142.17:26257?sslmode=disable';
var client = new pg.Client(connectionString);

router.get('/', function(req, res) {
    res.send('GET handler for /posts route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /posts route.');
});

module.exports = router;