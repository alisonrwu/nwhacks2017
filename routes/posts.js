var express = require('express');
var router = express.Router();

// Connect to CockroachDB
var async = require('async');
var pg = require('pg');
//var connectionString = process.env.DATABASE_URL || 'postgresql://root@52.60.142.17:26257?sslmode=disable';
//var client = new pg.Client(connectionString);
var config = {
  user: 'root',
  host: '52.60.142.17', //ip address of server
  database: 'nwhacks2017',
  port: 26257
};
/*
router.get('/', function(req, res) {
    res.send('GET handler for /posts route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /posts route.');
});
*/

router.post('/', (req, res, next) => {
  const results = [];
  // Grab data from http request
  var time_stamp = new Date(); 
  const data = {time_stamp:time_stamp, content: req.body["content"], lat: req.body["lat"],
  				long: req.body["long"],	max_life: req.body["max_life"]}

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    //longitude, latitude instead of location object easier?

    //get DateTime

    console.log(time_stamp);

    client.query('INSERT INTO post(time_stamp, content,lat,long,max_life) values($1,$2,$3,$4,$5)',
    [data.time_stamp, data.content, data.lat, data.long, data.max_life]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM post ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM post ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.post('/comments', (req, res, next) => {
  const results = [];
  // Grab data from http request
  var time_stamp = new Date(); 
  const data = {time_stamp:time_stamp, content: req.body["content"], lat: req.body["lat"],
  				long: req.body["long"],	max_life: req.body["max_life"]}

  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    //longitude, latitude instead of location object easier?

    //get DateTime

    console.log(time_stamp);

    client.query('INSERT INTO comments(post_id, time_stamp,username,content,max_life) values($1,$2,$3,$4,$5)',
    [data.time_stamp, data.content, data.lat, data.long, data.content]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM comments ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/comments', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM comments ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;