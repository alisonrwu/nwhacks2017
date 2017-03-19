var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var posts = require('./routes/posts');
var map = require('./routes/map');


// var async = require('async');
// var pg = require('pg');

var PORT = 8080;
// Connect to the cluster.
// var config = {
//   user: 'root',
//   host: '52.60.142.17', //ip address of server
//   database: 'bank',
//   port: 26257
// };

app.use('/posts', posts);
app.use('/map', map);

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/www/index.html');
});

app.get('/hi', function(req, res) {
	res.send('Hello World!');
});

app.get('/testPostPage', function(req, res) {
	res.sendFile(__dirname + '/client/www/testPostPage.html');
});
