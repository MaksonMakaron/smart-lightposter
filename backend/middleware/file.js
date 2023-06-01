const multer = require('multer');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const ScreenSystemInfo = require('../models/ScreenSystemInfo');
require('moment/locale/ru');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = 'uploads/' + req.params.idUser;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    cb(null, 'uploads/' + req.params.idUser);
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const date = moment();
    const formattedDate = date.format('DD-MM-YYYY_HH-mm-ss');
    const nameFile = `${formattedDate}_${file.originalname}`;
    cb(null, nameFile);
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'video/mp4', 'video/mov', 'video/wmv', 'video/avi', 'video/mkv'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.fileValidationError = 'Выберите файлы с расширениями: png, jpeg, jpg, gif, mp4, mov, mkv, avi, wmv';
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
