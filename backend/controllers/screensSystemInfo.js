const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/role');
const { ScreenSystemInfo, validateScreenSysInfo } = require('../models/ScreenSystemInfo');
const AudioOutput = require('../models/AudioOutput');

router.get('/getSystemInfo/:idScreen', async (req, res) => {
  try {
    const screenSystemInfo = await ScreenSystemInfo.find({ id_screen: new mongoose.Types.ObjectId(req.params.idScreen) });
    res.status(200).json(screenSystemInfo[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/getAudio', async (req, res) => {
  try {
    const audios = await AudioOutput.find();
    res.status(200).json(audios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/postSystemInfo', roleMiddleware(['ADMIN']), async (req, res) => {
  const screenSysInfo = new ScreenSystemInfo(req.body.screenSysInfo);
  const validate = validateScreenSysInfo(screenSysInfo);
  if (validate.status) {
    screenSysInfo._id = new mongoose.Types.ObjectId();
    screenSysInfo.save();
    res.json(screenSysInfo).status(200);
  } else {
    res.status(400).json(validate.error);
  }
});

router.put('/putSystemInfo', roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    const { _id, ...updatedFields } = req.body.screenSysInfo;
    const validate = validateScreenSysInfo(updatedFields);
    if (validate.status) {
      const id = new mongoose.Types.ObjectId(_id);
      await ScreenSystemInfo.updateOne({ _id: id }, updatedFields);
      res.status(201).json(updatedFields);
    } else {
      res.status(400).json(validate.error);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
