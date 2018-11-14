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
            sent_date: req.body.sent_date,
            file_id: req.body.file_id
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

//add message template
router.route('/templates/')
    .post(function (req, res) {
        models.message_templates.create({
            id: req.body.sender_id,
            office_id: req.body.office_id,
            title: req.body.title,
            body: req.body.body
        }).then(function (msgTpl) {
            res.json(msgTpl);
        });

    });

//Get all message template by office
router.route('/templates/office/:office_id')
    .get(function (req, res) {
        models.message_templates.findAll({
            where: {
                office_id: req.params.office_id
            }
        }).then(function (msgTpls) {
            res.json(msgTpls);
        });

    });

//Get message template by id
router.route('/templates/:id')
    .get(function (req, res) {
        models.message_templates.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (msgTpl) {
            res.json(msgTpl);
        });

    });

// Delete message template by id
router.delete('/templates/:id', function (req, res) {
    models.message_templates.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.json({message: 'Message template with id ' + req.params.id + ' deleted!'});
    });
});
module.exports = router;
