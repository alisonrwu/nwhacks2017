var express = require('express');
var app = express();
var PORT = 8080;

// var server = require('http').createServer(app);
// server.listen(PORT);
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

app.get('/', function (req, res) {
  // res.send('Hello World!')
  res.sendFile(__dirname + '/client/www/index.html');
});

app.get('/hi', function(req, res) {
	res.send('Hello World!');
});