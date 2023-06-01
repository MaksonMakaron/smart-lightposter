const express = require('express');
const router = express.Router();
const { Screen } = require('../models/Screen');
const User = require('../models/User');
const roleMiddleware = require('../middleware/role');
const tokenUser = require('../token');
const mongoose = require('mongoose');

router.get('/getMarketers', roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    const users = await User.find({ role: 'MARKETER' });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/getMarketerToScreen/:idScreen', roleMiddleware(['ADMIN']), async (req, res) => {
  try {
    const screen = await Screen.findById(new mongoose.Types.ObjectId(req.params.idScreen));
    const user = await User.findById(screen.id_user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/getUser', async (req, res) => {
  try {
    const user = await tokenUser(req, res);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
