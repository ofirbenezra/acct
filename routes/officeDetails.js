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
        // console.log('Adding Office with payload: ' + JSON.stringify(req, null, 2));
        models.office_details.create({
            office_id: req.body.office_id,
            office_type: req.body.office_type,
            email: req.body.email,
            country: req.body.country,
            city: req.body.city,
            street_number: req.body.street_number,
            zip_code: req.body.zip_code,
            office_name: req.body.office_name,
            main_contact_first_name: req.body.main_contact_first_name,
            main_contact_last_name: req.body.main_contact_last_name,
            //This should change to file stream which that should be saved to s3 (and write url here)
            logo_file_url: 'https://easy-office-files.s3-eu-west-1.amazonaws.com/logo/logo.png'
        }).then(function (office) {
            res.json(office);
        });

    });

module.exports = router;