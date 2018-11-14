const Busboy = require('busboy');
var express = require('express');
const router = express.Router();
var models  = require('../models');
const s3FileUploader = require('../s3Uploader');


router.post('/upload', function (req, res, next) {
    var busboy = new Busboy({headers: req.headers});
    // The file upload has completed
    busboy.on('finish', function () {
        console.log('Upload finished');
        // Your files are stored in req.files. In this case,
        // you only have one and it's req.files.file:
        // This returns:
        // {
        //    file: {
        //      data: ...contents of the file...,
        //      name: 'Example.jpg',
        //      encoding: '7bit',
        //      mimetype: 'image/png',
        //      truncated: false,
        //      size: 959480
        //    }
        // }
        // Grabs your file object from the request.
        const file = req.files.file;
        var uploadPromise = s3FileUploader.uploadToS3(file);
        uploadPromise.then(function(result) {
            models.files.create({
                file_id: Math.random().toString(20),
                file_name: file.name,
                s3_url: result,
                sender_id: req.body.sender_id,
                reciever_id: req.body.reciever_id,
                date: Date.now()
            }).then(function (fileRes) {
                res.json(fileRes.file_id);
            });
        }, function(err) {
            console.log(err);
        });
    });
    req.pipe(busboy);
});

//get file by file_id
router.get('/', function (req, res, next) {
    models.files.findAll({
        where: {
            file_id: req.query.file_id
        }
    }).then(function (msg) {
        res.json(msg);
    });

});
module.exports = router;