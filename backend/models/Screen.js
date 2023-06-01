const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  _id: { type: Object },
  id_user: { type: Object },
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  finishTime: { type: Date, required: true },
  audioOutput: { type: String, required: true },
  dateFormat: { type: String, required: true },
  showSplach: { type: Boolean, required: true },
});

const validateScreen = (screen) => {
  let error = '';
  let status = false;

  if (!screen.id_user) {
    error = '\r\nНе задан пользователь';
  } else {
    screen.id_user = new mongoose.Types.ObjectId(screen.id_user);
  }

  if (!screen.name) {
    error += '\r\nВведите наименование экрана';
  }

  if (!screen.startTime) {
    error += '\r\nВведите время начала';
  }

  if (!screen.finishTime) {
    error += '\r\nВведите время окончания';
  }

  if (screen.startTime && screen.finishTime) {
    if (screen.startTime > screen.finishTime) {
      error += '\r\nВремя окончания должно быть больше времени начала';
    }
  }

  if (!screen.audioOutput) {
    error += '\r\nВыберите аудио-вывод';
  }

  if (!screen.dateFormat) {
    error += '\r\nВыберите формат даты';
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

const convertTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const currentDate = new Date();
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);
  return currentDate;
};

const Screen = mongoose.model('Screen', screenSchema, 'screens');

module.exports = {
  validateScreen,
  Screen,
  convertTime,
};
