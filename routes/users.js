var express = require('express');
var router = express.Router();
var models  = require('../models');

//get users by office_id and user type
router.get('/', function (req, res, next) {
    var sql  =  'SELECT USR.name, USR.last_name, USR.office_phone, USR.office_id ' +
                'FROM acct.users as USR, office_details as OD ' +
                'where USR.office_id = ' + req.query.office_id + ' AND USR.user_type = ' + req.query.user_type + ';';
    models.users.sequelize.query(sql,{ type: models.users.sequelize.QueryTypes.SELECT})
        .then(function(users) {
            res.json(users);
        })

});

//get user by id
router.get('/:id', function (req, res, next) {
    models.users.findAll({
        where: {
            id: req.params.id
        }
    }).then(function (user) {
        res.json(user);
    });


});

//add user
router.route('/')
    .post(function (req, res) {
        models.users.create({
            office_phone: req.body.office_phone,
            office_id: req.body.office_id,
            name: req.body.name,
            last_name: req.body.last_name,
            password: req.body.password,
            user_type: req.body.user_type
        }).then(function (user) {
            res.json(user);
        });

    });

//update user
router.put('/:office_id', function (req, res, next) {
    models.users.update({

            "office_phone": req.body.office_phone,
            "name": req.body.name,
            "description": req.body.description,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "password": req.body.password
        },
        {
            where: {
                office_id: req.params.office_id
            }
        }).then(function (user) {
        res.json(user);
    });

});

module.exports = router;
