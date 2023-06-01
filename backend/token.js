const jwt = require('jsonwebtoken');
const { secret } = require('./config');
const mongoose = require('mongoose');
const User = require('./models/User');

const decodedUser = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }
  const decoderData = jwt.verify(token, secret);

  const user = await User.findById(new mongoose.Types.ObjectId(decoderData.id));
  return user;
};

module.exports = decodedUser;
