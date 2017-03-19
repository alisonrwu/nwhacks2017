var path = require('path')
var express = require('express');
var router = express.Router();

var async = require('async');
var pg = require('pg');
// var connectionString = process.env.DATABASE_URL || 'postgresql://root@52.60.142.17:26257?sslmode=disable';
// var client = new pg.Client(connectionString);
var config = {
  user: 'root',
  host: '52.60.142.17', //ip address of server
  database: 'nwhacks2017',
  port: 26257
};

router.get('/', function(req, res){
    // res.send('GET handler for /map route.');
    // res.sendFile(path.join(__dirname, '../client/www/maptest.html'));
	console.log('trying to get...');

    const results = [];
	// Get a Postgres client from the connection pool
	pg.connect(config, (err, client, done) => {
		console.log(client);
		// Handle connection errors
		if(err) {
			console.log('connection error ?');
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

		query.on('error', function(err) {
			console.log('query error ?');
			console.log(err);
			res.status(500).json({ success: false, data: err});
			done();
    	});
	});
});

router.post('/', function(req, res) {
    res.send('POST handler for /map route.');
});


module.exports = router;