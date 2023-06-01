const mongoose = require('mongoose');

const screenSystemInfoSchema = new mongoose.Schema({
  _id: { type: Object },
  id_screen: { type: Object },
  memoryTotal: { type: Number },
  monitor: { type: String },
  displayPower: { type: Number },
  modelRaspeberryPi: { type: Object },
  addressMAC: { type: String },
});

const validateScreenSysInfo = (screenSysInfo) => {
  let error = '';
  let status = false;

  if (!screenSysInfo.id_screen) {
    error = '\r\nВыберите экран';
  } else {
    screenSysInfo.id_screen = new mongoose.Types.ObjectId(screenSysInfo.id_screen);
  }

  if (!screenSysInfo.memoryTotal) {
    error += '\r\nВведите память';
  } else {
    if (screenSysInfo.memoryTotal > 64 || screenSysInfo.memoryTotal < 0) {
      error += '\r\nПамять должна быть от 0 до 64';
    }
  }

  if (!screenSysInfo.displayPower) {
    error += '\r\nВведите мощность';
  } else {
    if (screenSysInfo.displayPower >= 600 || screenSysInfo.displayPower < 0) {
      error += '\r\nМощность должна быть от 0 до 400';
    }
  }

  if (!screenSysInfo.modelRaspeberryPi) {
    error += '\r\nЗаполните модель Raspberry Pi';
  }

  if (error) {
    status = false;
    return {
      error,
      status,
    };
  }
  status = true;
  return {
    error,
    status,
  };
};

const ScreenSystemInfo = mongoose.model('ScreenSystemInfo', screenSystemInfoSchema, 'screensSystemInfo');

module.exports = { ScreenSystemInfo, validateScreenSysInfo };
