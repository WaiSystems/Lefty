var express = require('express');

var router = express.Router();

router.post('/login', function (req, res) {
    setTimeout(function () {
        res.send({status: "OK"});
    }, 2000)
});

module.exports = router;