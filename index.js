const fs = require("fs");
const s3 = require('./storage')

const { params } = s3

s3.listObjects(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else {
    let paths = [];

    data["Contents"].forEach(function (obj) {
      const splitedPath = obj.Key.split("/");
      splitedPath.pop();
      paths.push(splitedPath);
    });

    const setPath = new Set();
    paths.forEach((pathArr) => {
      const path = pathArr.join("/");
      if (path === "") return;
      setPath.add(path);
    });
    [...setPath].forEach((path) => {
      fs.mkdirSync(`output/${path}`, { recursive: true }, (err, created) => {
        if (err) {
          console.log(err);
          return;
        }
        if (created) {
          console.log("folder created:", created);
        } else {
          console.log("folder already exists:", path);
        }
      });
    });

    const totalItems = data.Contents.length
    data["Contents"].forEach(function (obj, i) {
      s3.getObject({ ...params, Key: obj.Key }, function (err, data) {
        if (err) {
          console.log(err, err.stack)
          return
        };

        const lastChar = obj.Key.slice(-1)
        if (lastChar === '/') return

        fs.writeFileSync(`output/${obj.Key}`, data.Body);

        console.log('downloaded', i, 'from', totalItems)
      });
    });
  }
});

