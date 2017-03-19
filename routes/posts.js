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
  const time_stamp = Math.floor(Date.now() / 1000)
  const data = {time_stamp:time_stamp, content: req.query["content"], lat: req.query["lat"],
  				lon: req.query["long"],	max_life: req.query["max_life"]}

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
    [data.time_stamp, data.content, data.lat, data.lon, data.max_life]);
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
  const lat = req.query["lat"];
  const lon = req.query["lon"]; // this will be replaced by cordova coordinates, sent by JS
  const radius = req.query["radius"]; // again, this will be sent by JS
console.log(req);
  const queryString = "SELECT * FROM post WHERE lat > " + (lat - radius).toString() + " AND lat < " + (lat + radius).toString() + " AND long > " + (lon - radius).toString() +
  " AND long < " + (lon + radius).toString() + " ORDER BY id ASC;";
  console.log(queryString);
  // Get a Postgres client from the connection pool
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query(queryString);
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
  var time_stamp = Math.floor(Date.now() / 1000)
  const data = {time_stamp:time_stamp, post_id: req.query["post_id"], username: req.query["username"],
  				content: req.query["content"]}

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

    client.query('INSERT INTO comment(post_id, time_stamp,username,content) values($1,$2,$3,$4)',
    [data.post_id, data.time_stamp, data.username, data.content]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM comment ORDER BY id ASC');
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
  const id = req.query["post_id"]; // this will be passed in by JS
  const queryString = "SELECT * FROM comment WHERE post_id = " + id + " ORDER BY id ASC;";
  // Get a Postgres client from the connection pool
    const time_stamp = Math.floor(Date.now() / 1000)
    console.log(time_stamp);
  pg.connect(config, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query(queryString);
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
