const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/role');
const tokenUser = require('../token');
const { Screen, validateScreen, convertTime } = require('../models/Screen');
const { ScreenSystemInfo } = require('../models/ScreenSystemInfo');

router.get('/getScreens', async (req, res) => {
  try {
    const user = await tokenUser(req, res);
    let screens;
    if (user.role === 'ADMIN') {
      screens = await Screen.find();
    } else {
      screens = await Screen.find({ id_user: new mongoose.Types.ObjectId(user._id) });
    }

    if (!screens) {
      return res.status(404).json({ error: 'Экран не найден' });
    }
    res.status(200).json(screens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/getScreen/:idScreen', async (req, res) => {
  try {
    const screens = await Screen.findOne({ _id: new mongoose.Types.ObjectId(req.params.idScreen) });
    if (!screens) {
      return res.status(404).json({ error: 'Экран не найден' });
    }
    res.status(200).json(screens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/postScreen', roleMiddleware(['ADMIN']), async (req, res) => {
  if (!req.body.screen.hasOwnProperty('showSplach')) {
    req.body.screen.showSplach = false;
  }
  const screen = new Screen(req.body.screen);
  const validate = validateScreen(screen);
  if (validate.status) {
    screen._id = new mongoose.Types.ObjectId();
    screen.save();
    res.json(screen).status(200);
  } else {
    res.status(400).json(validate.error);
  }
});

router.put('/putScreen', roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    const { _id, ...updatedFields } = req.body.settings;
    const validate = validateScreen(updatedFields);
    if (validate.status) {
      const id = new mongoose.Types.ObjectId(_id);
      await Screen.updateOne({ _id: id }, updatedFields);
      res.status(201).json(updatedFields);
    } else {
      res.status(400).json(validate.error);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/deleteScreen', roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    const deleteScreen = await Screen.findById(new mongoose.Types.ObjectId(req.body.idScreen));
    if (!deleteScreen) {
      return res.status(404).json({ error: 'Экран не найден' });
    }

    const deleteScreenSysInfo = await ScreenSystemInfo.findOne({ id_screen: deleteScreen._id });
    if (!deleteScreenSysInfo) {
      return res.status(404).json({ error: 'Системная информация не найдена' });
    }
    await deleteScreenSysInfo.deleteOne();
    await deleteScreen.deleteOne();
    res.status(201).json(deleteScreen);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
