var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var posts = require('./routes/posts');
var map = require('./routes/map');


var PORT = 8080;

// Add headers
app.all("*", function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with, content-type, content-length, authorization, accept, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/posts', posts);
app.use('/map', map);

app.listen(process.env.PORT || PORT, function(){
    console.log(__dirname);
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

app.get('/getPostPage', function(req, res) {
	res.sendFile(__dirname + '/client/www/getPostPage.html');
});

app.get('/settings', function(req, res) {
    res.sendFile(__dirname + '/client/www/settings.html');
});
