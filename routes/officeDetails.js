var express = require('express');
var router = express.Router();
var models  = require('../models');

//get office_details by office id
router.get('/:office_id', function (req, res, next) {
    models.office_details.findAll({
        where: {
            office_id: req.params.office_id
        }
    }).then(function (office) {
        res.json(office);
    });
});

//add office_details
router.route('/')
    .post(function (req, res) {
        models.office_details.create({
            office_id: req.body.office_id,
            user_id: req.body.user_id,
            office_type: req.body.office_type,
            email: req.body.email,
            country: req.body.country,
            city: req.body.city,
            street_number: req.body.street_number,
            zip_code: req.body.zip_code
        }).then(function (office) {
            res.json(office);
        });

    });

module.exports = router;