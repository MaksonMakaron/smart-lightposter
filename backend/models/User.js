const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: Object,
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  patronymic: { type: String },
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, required: true, ref: 'Role' },
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
