var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET handler for /posts route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /posts route.');
});

module.exports = router;