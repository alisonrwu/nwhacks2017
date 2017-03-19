var path = require('path')
var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    // res.send('GET handler for /map route.');
    res.sendFile(path.join(__dirname, '../client/www/maptest.html'));
});

router.post('/', function(req, res) {
    res.send('POST handler for /map route.');
});


module.exports = router;