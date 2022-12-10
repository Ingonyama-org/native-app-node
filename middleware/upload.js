const util = require("util");
const multer = require("multer");
const MongoClient = require("mongodb").MongoClient;
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/db");

// using a promise
const promise = MongoClient.connect(dbConfig.url).then((client) =>
  client.db(dbConfig.database)
);

var storage = new GridFsStorage({
  db: promise,
  // url: dbConfig.url + dbConfig.database,
  // options: {
  //   useNewUrlParser: true,
  // },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: dbConfig.imgBucket,
      filename: `${Date.now()}-bezkoder-${file.originalname}`,
    };
  },
});

var uploadFiles = multer({ storage: storage }).single("uploadPhoto");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
