var express = require('express');
var router = express.Router();
var models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//add user
router.route('/login')
    .post(function (req, res) {
        models.users.findOne({
            where: {
                office_phone: req.body.office_phone,
                password: req.body.password
            }
        }).then(function (user) {
            if(user) {
                res.json(user);
            }
            else {
                res.json(false);
            }
        });

    });


module.exports = router;
