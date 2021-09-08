const s3 = require("./storage");

const { params } = s3;

s3.listObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
        console.log(data.Contents.length)
    }
});
