const AWS = require('aws-sdk');
const Busboy = require('busboy');
const promise = require('Promise');
const fs = require('fs');

const BUCKET_NAME = 'easy-office-files';
const IAM_USER_KEY = 'XXXXXXX';
const IAM_USER_SECRET = 'XXXXX';

const s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
});

module.exports.uploadToS3 = function(file) {


    return new Promise(function(resolve, reject) {
        s3bucket.createBucket(function () {
            var params = {
                Bucket: BUCKET_NAME,
                Key: file.name,
                Body: file.data,
            };
            s3bucket.upload(params, function (err, data) {
                if (err) {
                    console.log('error in callback');
                    console.log(err);
                    reject(err);
                }
                console.log('success');
                console.log(data);
                resolve(data.Location);
            });

        });
    });

}


module.exports.downLoadFromS3 = function(fileName, res) {

    var getParams = {
        Bucket: BUCKET_NAME,
        Key: fileName
    }
    res.attachment(fileName);
    var fileStream = s3bucket.getObject(getParams).createReadStream();
    fileStream.pipe(res);

}

