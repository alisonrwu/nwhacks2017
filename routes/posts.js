var express = require('express');
var router = express.Router();
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
  const data = {content: req.body.content, lat: req.body.lat,long: req.body.long, 
  				maxRadius: req.body.maxRadius, maxLife: req.body.maxLife,};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    //longitude, latitude instead of location object easier?

    //get DateTime
    var timestamp = new Date().toLocaleString();

    client.query('INSERT INTO posts(timestamp,context,lat,lon,maxRadius,maxLife) values($1,$2,$3,$4,$5,$6)',
    [timestamp, data.content, data.lat, data.long, data.maxRadius, maxLife]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM posts ORDER BY id ASC');
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
    const query = client.query('SELECT * FROM posts ORDER BY id ASC;');
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