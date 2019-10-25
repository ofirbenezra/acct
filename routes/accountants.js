var express = require('express');
var router = express.Router();
var models = require('../models');

//get office accountant by office id and accountant id
router.get('/:office_id', function (req, res, next) {
    models.office_accountanats.findAll({
        where: {
            office_id: req.params.office_id
        }
    }).then(function (acct) {
        res.json(acct);
    });
});

//add accountant
router.route('/:office_id')
    .post(function (req, res) {
        models.office_accountanats.create({
            office_id: req.params.office_id,
            acct_name: req.body.acct_name
        }).then(function (acct) {
            models.users.update({
                main_acct: acct.acct_id
            }, {
                where: {office_id: req.params.office_id,
                        user_type: 1}
            }).then(function (office) {
                res.json(acct);
            });
        });
    });

//delete accountant
router.route('/:office_id/:acct_id')
    .delete(function (req, res) {
        models.users.update({
            main_acct: null
        }, {
            where: {office_id: req.params.office_id}
        }).then(function (user) {
            models.office_accountanats.destroy({
                where: {
                    acct_id: req.params.acct_id
                }
            }).then(function (acct) {
                res.json(acct);
            });
        });
    });

module.exports = router;