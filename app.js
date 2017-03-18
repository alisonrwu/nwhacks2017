var express = require('express');
var app = express();
var async = require('async');
var pg = require('pg');

var PORT = 8080;
// Connect to the cluster.
var config = {
  user: 'maxroach',
  host: 'localhost',
  database: 'bank',
  port: 26257
};

// var server = require('http').createServer(app);
// server.listen(PORT);
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/www/index.html');
});

app.get('/hi', function(req, res) {
	res.send('Hello World!');
});

app.get('/map', function(req, res) {
	res.sendFile(__dirname + '/maptest/index.html');
});