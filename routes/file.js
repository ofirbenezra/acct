const Busboy = require('busboy');
var express = require('express');
const router = express.Router();
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
        s3FileUploader.uploadToS3(file);
    });
    req.pipe(busboy);
});
module.exports = router;