const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const roleMiddleware = require('../middleware/role');
const fs = require('fs');
const router = express.Router();
const { Media, validateMedia, getMediaType } = require('../models/Media');
const fileMiddleware = require('../middleware/file');

router.get('/getMedia/:idScreen', async (req, res) => {
  try {
    const media = await Media.find({ id_screen: new mongoose.Types.ObjectId(req.params.idScreen) });
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/getCurrentMedia/:idMedia', async (req, res) => {
  try {
    const media = await Media.findOne({ _id: new mongoose.Types.ObjectId(req.params.idMedia) });
    if (media) {
      res.status(200).json(media);
    } else {
      res.status(404).json({ message: 'Медиа не найдено' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/downloadMedia/:idUser/:idMedia', async (req, res) => {
  try {
    const media = await Media.findById(new mongoose.Types.ObjectId(req.params.idMedia));
    const pathFile = `uploads/${req.params.idUser}/${media.path}`;
    if (fs.existsSync(pathFile)) {
      res.attachment(media.path);
      res.download(path.join(__dirname, `../${pathFile}`), media.path);
    } else {
      res.status(404).json({ message: 'Файл не найден' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/uploadMedia/:idUser', fileMiddleware.single('file'), (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'Вы не выбрали файл' });
  }
  if (req.file) {
    res.json({ send: 'Файл успешно загружен', file: req.file }).status(200);
  }
  next();
});

router.post('/postMedia', (req, res) => {
  try {
    const media = new Media(req.body.media);
    media.typeContent = getMediaType(media.path);
    const validate = validateMedia(media);
    if (validate.status) {
      media._id = new mongoose.Types.ObjectId();
      media.save();
      res.json(media).status(200);
    } else {
      res.status(400).json(validate.error);
    }
  } catch (error) {
    console.log(error);
  }
});

router.put('/putMedia', roleMiddleware(['MARKETER']), async (req, res) => {
  try {
    const { _id, ...updatedFields } = req.body.media;
    const validate = validateMedia(updatedFields);
    if (validate.status) {
      const id = new mongoose.Types.ObjectId(_id);
      await Media.updateOne({ _id: id }, updatedFields);
      res.status(201).json(updatedFields);
    } else {
      res.status(400).json(validate.error);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.patch('/patchMediaOrdinal', async (req, res) => {
  try {
    const arrMedia = req.body.arrMedia;
    const resultMedia = [];
    for (let i = 0; i < arrMedia.length; i++) {
      const media = arrMedia[i];
      const updatedMedia = await Media.findById(new mongoose.Types.ObjectId(media._id));
      if (!updatedMedia) {
        return res.status(404).json({ error: 'Медиа не найдено' });
      }
      updatedMedia.ordinal = media.ordinal;
      await updatedMedia.save();
      resultMedia.push(updatedMedia);
    }
    res.status(201).json(resultMedia);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/patchMediaStatus', async (req, res) => {
  try {
    const updatedMedia = await Media.findById(new mongoose.Types.ObjectId(req.body._id));
    if (!updatedMedia) {
      return res.status(404).json({ error: 'Медиа не найдено' });
    }
    updatedMedia.status = !updatedMedia.status;
    await updatedMedia.save();
    res.status(201).json(updatedMedia);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/deleteMedia/:idUser/:idMedia', async (req, res) => {
  try {
    const deleteMedia = await Media.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.idMedia));
    if (!deleteMedia) {
      return res.status(404).json({ error: 'Медиа не найдено' });
    }
    const pathFile = `uploads/${req.params.idUser}/${deleteMedia.path}`;
    fs.unlink(pathFile, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    res.status(201).json(deleteMedia);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
