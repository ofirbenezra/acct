var express = require('express');
var router = express.Router();
var models  = require('../models');

//get messasges by sender id
router.get('/', function (req, res, next) {
    models.messages.findAll({
        where: {
            sender_id: req.query.sender_id
        }
    }).then(function (msg) {
        res.json(msg);
    });

});


module.exports = router;
