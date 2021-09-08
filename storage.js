const AWS = require("aws-sdk");
const config = require("./config");

const spacesEndpoint = new AWS.Endpoint(config.endpoint);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: config.auth.key,
  secretAccessKey: config.auth.secret,
});

const params = { Bucket: config.bucket };

module.exports = s3
module.exports.params = params
