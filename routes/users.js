var express = require('express');
var router = express.Router();
var models  = require('../models');

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

// router.put('/:id', function (req, res, next) {
//     const isGuide = req.query.isGuide == 'true'? true :false;
//     if(isGuide){
//         models.tourguide.update({
//
//                 "firstName": req.body.firstName,
//                 "lastName": req.body.lastName,
//                 "description": req.body.description,
//                 "profilePicture": req.body.profilePicture,
//                 "email": req.body.email,
//                 "password": req.body.password,
//                 "verificationFlag": req.body.verificationFlag,
//                 "country": req.body.country,
//                 "phone": req.body.phone,
//                 "rating": req.body.rating
//             },
//             {
//                 where: {
//                     tourGuideId: req.params.id
//                 }
//             }).then(function (user) {
//             res.json(user);
//         });
//     }
//     else {
//         models.user.update(
//             {   "firstName": req.body.firstName,
//                 "lastName": req.body.lastName,
//                 "email": req.body.email,
//                 "password": req.body.password,
//                 "verificationFlag": req.body.verificationFlag,
//                 "country": req.body.country
//             },{
//                 where: {
//                     userId: req.params.id
//                 }
//             }
//         ).then(function (user) {
//             res.json(user);
//         });
//     }
//
// });
//
// router.route('/login')
//     .post(function (req, res) {
//         const isGuide = req.query.isGuide == 'true'? true :false;
//         if(isGuide){
//             models.tourguide.findOne({
//                 attributes: { exclude: ['password']} ,
//                 where: {
//                     email: req.body.email,
//                     password: req.body.password
//
//                 }
//             }).then(function (user) {
//                 if(user != null){
//                     res.json(user);
//                 }
//                 else{
//                     res.json({});
//                 }
//
//             });
//         }
//         else{
//             models.user.findOne({
//                 attributes: { exclude: ['password']} ,
//                 where: {
//                     email: req.body.email,
//                     password: req.body.password
//
//                 }
//             }).then(function (user) {
//                 if(user != null){
//                     res.json(user);
//                 }
//                 else{
//                     res.json({});
//                 }
//
//             });
//         }
//     });


module.exports = router;
