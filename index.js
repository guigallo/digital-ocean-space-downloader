const fs = require('fs');
const AWS = require("aws-sdk");
const config = require("./config");

const spacesEndpoint = new AWS.Endpoint(config.endpoint);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: config.auth.key,
  secretAccessKey: config.auth.secret,
});

const params = { Bucket: config.bucket };

// s3.listBuckets({}, function (err, data) {
//   if (err) console.log(err, err.stack);
//   else {
//     data["Buckets"].forEach(function (space) {
//       console.log(space["Name"]);
//     });
//   }
// });

s3.listObjects(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else {
    let paths = []

    data["Contents"].forEach(function (obj) {
      const splitedPath = obj.Key.split('/')
      splitedPath.pop()
      paths.push(splitedPath)
    });

    const setPath = new Set()
    paths.forEach((pathArr) => {
      const path = pathArr.join('/')
      if (path === '') return
      setPath.add(path)
    })

    ;[...setPath].forEach((path) => {
      fs.mkdir(`output/${path}`, { recursive: true }, (err, created)=> {
        if (err) {
          console.log(err)
          return
        }
        if (created) {
          console.log('folder created:', created)
        } else {
          console.log('folder already exists:', path)
        }
      })
    })

    data["Contents"].forEach(function (obj) {
      console.log(obj)
    });
  }
});
