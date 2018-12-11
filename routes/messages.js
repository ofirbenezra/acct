var express = require('express');
var router = express.Router();
var models = require('../models');
const promise = require('Promise');

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
        let result = {};
        msg.forEach(x => {
            if(result[x.message_id]){
                result[x.message_id]['reciever_id'] = result[x.message_id]['reciever_id'] + ',' + x.reciever_id;
            }
            else{
                result[x.message_id] = [];
                result[x.message_id] = x.dataValues;
            }
        });
        res.json(Object.values(result));
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
    .post(function (req, res, next) {
        const recipients = req.body.reciever_id;
        getMaxMessageId().then(function (max_id) {
            models.sequelize.transaction(function (t) {
                var promises = []

                for (var i = 0; i < recipients.length; i++) {
                    var newPromise = models.messages.create({
                            message_id: max_id + 1,
                            sender_id: req.body.sender_id,
                            reciever_id: recipients[i],
                            title: req.body.title,
                            body: req.body.body,
                            sent_date: req.body.sent_date,
                            file_id: req.body.file_id
                        },
                        {transaction: t});
                    promises.push(newPromise);
                }
                ;
                return Promise.all(promises).then(function (messages) {
                    res.json({
                        message_id: max_id + 1,
                        sender_id: req.body.sender_id,
                        reciever_id: recipients,
                        title: req.body.title,
                        body: req.body.body,
                        sent_date: req.body.sent_date,
                        file_id: req.body.file_id
                    });
                }).catch(function (err) {
                    console.log(err);
                    return next(err);
                });

            });
        }).catch(function(err) {
            return next(err);
        });
    });

function getMaxMessageId() {
    return new Promise(function (resolve, reject) {
        models.messages.max('message_id').then(function (msg) {
            resolve(msg);
        }).catch(function (err) {
            reject(err);
        });
    });
}

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

//Update message template by id
router.route('/templates/:id')
    .put(function (req, res, next) {
        models.message_templates.update({
            title: req.body.title,
            body: req.body.body
        }, {
            where: {
                id: req.params.id,
            }
        }).then(function (msgTpl) {
            getTemplateById(req.params.id).then(function (result) {
                res.json(result);
            }).catch(next);

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
            const templates = msgTpls;
            models.default_message_templates.findAll()
                .then(function (defaultMsgTpls) {
                    const result = templates.concat(defaultMsgTpls);
                    res.json(result);
                });
        });
    });

//Get message template by id
router.route('/templates/:id')
    .get(function (req, res, next) {
        getTemplateById(req.params.id).then(function (result) {
            res.json(result);
        }).catch(next);
    });

function getTemplateById(id) {
    return new Promise(function (resolve, reject) {
        models.message_templates.findOne({
            where: {
                id: id
            }
        }).then(function (msgTpl) {
            resolve(msgTpl);
        }).catch(function (err) {
            reject(err);
        });

    });
}

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
