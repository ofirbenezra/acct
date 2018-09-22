const AWS = require('aws-sdk');
const Busboy = require('busboy');

const BUCKET_NAME = 'ost.acct';
const IAM_USER_KEY = 'AKIAI2QFURORX4QDLBXQ';
const IAM_USER_SECRET = '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';

module.exports.uploadToS3 = function(file) {
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
    });
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
            }
            console.log('success');
            console.log(data);
        });
    });
}

