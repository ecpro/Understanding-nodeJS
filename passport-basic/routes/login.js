var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('req', req.headers);
    console.log('res', res.headers);
    res.render('login');
})

module.exports = router;