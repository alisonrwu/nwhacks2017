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

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/posts', posts);
app.use('/map', map);

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/www/placeholder-index.html');
});

app.get('/hi', function(req, res) {
	res.send('Hello World!');
});

app.get('/testPostPage', function(req, res) {
	res.sendFile(__dirname + '/client/www/testPostPage.html');
});

app.get('/getPostPage', function(req, res) {
	res.sendFile(__dirname + '/client/www/getPostPage.html');
});

app.get("/app", function(req, res) {
    res.sendFile(__dirname + "/client/www/placeholder-index.html");
});
