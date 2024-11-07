const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb is callback
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = { upload };