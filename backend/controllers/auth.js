const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
const LoginHistory = require('../models/LoginHistory');
const { secret } = require('../config');
const mongoose = require('mongoose');

const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });

    if (!user) {
      return res.json({ message: 'Неверные учетные данные' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.json({ message: 'Неверные учетные данные' });
    }

    const token = generateAccessToken(user._id, user.role);

    const localDate = new Date();
    const moscowOffsetDate = new Date(localDate.getTime() + 3 * 60 * 60 * 1000);

    const newLoginHistory = new LoginHistory({
      _id: new mongoose.Types.ObjectId(),
      id_user: user._id,
      datetime: moscowOffsetDate,
    });

    newLoginHistory
      .save()
      .then((savedLoginHistory) => {})
      .catch((error) => {});

    return res.json({ token, user });
  } catch (error) {
    res.json({ message: 'Ошибка авторизации' });
  }
});

module.exports = router;
