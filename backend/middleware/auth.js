const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }
    const decoderData = jwt.verify(token, secret);
    req.user = decoderData;
    next();
  } catch (error) {
    return res.status(401);
  }
};
