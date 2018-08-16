var express = require('express');
var router = express.Router();
var models  = require('../models');

//get messages by sender id
router.get('/', function (req, res, next) {
    var isSender = req.query.isSender === 'true';
    var queryObj = {};
    if (isSender) {
        queryObj['sender_id'] = req.query.sender_id;
    }
    else {
        queryObj['reciever_id'] = req.query.reciever_id;
    }

    models.messages.findAll({
        where: queryObj
    }).then(function (msg) {
        res.json(msg);
    });

});

//get messages by reciver id
router.get('/', function (req, res, next) {
    models.messages.findAll({
        where: {
            reciever_id: req.query.reciever_id
        }
    }).then(function (msg) {
        res.json(msg);
    });

});

//add message
router.route('/')
    .post(function (req, res) {
        models.messages.create({
            sender_id: req.body.sender_id,
            reciever_id: req.body.reciever_id,
            title: req.body.title,
            body: req.body.body,
            sent_date: req.body.sent_date
        }).then(function (msg) {
            res.json(msg);
        });

    });

//update message_read
router.route('/')
    .put(function (req, res) {
        models.messages.update({
            message_read: req.body.message_read
        }, {
            where: {id: req.query.id}
        }).then(function (tag) {
            res.json({message: 'message_read updated!'});
        });
    });

// Delete message by id
router.delete('/:id', function (req, res) {
    models.messages.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.json({message: 'Message with id ' + req.params.id + ' deleted!'});
    });
});

module.exports = router;
