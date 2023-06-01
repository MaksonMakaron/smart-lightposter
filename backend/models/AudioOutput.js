const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});

const AudioOutput = mongoose.model('AudioOutput', audioSchema, 'audioOutputs');

module.exports = AudioOutput;
