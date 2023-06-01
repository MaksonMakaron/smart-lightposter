const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  value: { type: String, unique: true, required: true },
});

const Role = mongoose.model('Role', roleSchema, 'roles');

module.exports = Role;
