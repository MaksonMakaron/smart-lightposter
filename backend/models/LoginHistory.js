const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
  _id: { type: Object },
  id_user: { type: String, required: true },
  datetime: { type: Date, required: true },
});

const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema, 'loginHistory');

module.exports = LoginHistory;
