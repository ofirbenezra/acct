const AWS = require('aws-sdk');
const Busboy = require('busboy');
const promise = require('Promise');

const BUCKET_NAME = 'ost.acct';
const IAM_USER_KEY = 'xxx';
const IAM_USER_SECRET = 'xxx';

module.exports.uploadToS3 = function(file) {
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
    });

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

