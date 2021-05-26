const router = require('express').Router();
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// process.env.AWS_ACCESS_KEY_ID = 'AKIAV5TZCAXDZHEYS2MO';
// process.env.AWS_SECRET_ACCESS_KEY = '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';

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ID,
//   secretAccessKey: process.env.AWS_KEY,
// });

// const file = '/Users/admin/projects/reads-and-weeds/public/images/library.jpg';

// const fileStream = fs.createReadStream(file);
// fileStream.on('error', function (err) {
//   console.log('File Error', err);
// });
// const uploadParams = { Bucket: 'bookclub-site-images', Key: '', Body: '' };
// uploadParams.Body = fileStream;
// uploadParams.ContentType = 'image/jpeg';
// uploadParams.Key = path.basename(file);

// call S3 to upload file to specified bucket
// s3.upload(uploadParams, function (err, data) {
//   if (err) {
//     console.log('Error', err);
//   }
//   if (data) {
//     console.log('Upload Success', data.Location);
//   }
// });

module.exports = router;
