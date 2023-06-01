const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  _id: { type: Object, required: true },
  id_screen: { type: Object, required: true },
  name: { type: String, required: true },
  start: { type: Date, required: true },
  finish: { type: Date, required: true },
  duration: { type: Number, required: true },
  typeContent: { type: String, required: true },
  path: { type: String, required: true },
  status: { type: Boolean, required: true },
  ordinal: { type: Number },
});

const validateMedia = (media) => {
  let error = '';
  let status = false;

  if (!media.id_screen) {
    error = '\r\nВыберите экран';
  } else {
    media.id_screen = new mongoose.Types.ObjectId(media.id_screen);
  }

  if (!media.name) {
    error += '\r\nВведите наименование медиа';
  }
  if (!media.start) {
    error += '\r\nВыберите дату начала показа';
  }

  if (!media.finish) {
    error += '\r\nВыберите дату окончания показа';
  }

  if (media.start && media.finish) {
    if (media.start > media.finish) {
      error += '\r\nВремя окончания должно быть больше времени начала';
    }
  }

  if (!media.typeContent) {
    error += '\r\nОшибка. Не задан тип медиа';
  }

  if (!media.duration) {
    error += '\r\nВведите длительность';
  } else {
    if (media.duration <= 9 || media.duration >= 1001) {
      error += '\r\nДлительность должна быть от 10 до 1000';
    }
  }

  if (!media.path) {
    error += '\r\nОшибка. Не задан путь к медиа';
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

const getMediaType = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();

  if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
    return 'IMAGE';
  } else if (extension === 'mp4' || extension === 'avi' || extension === 'mov' || extension === 'wmv') {
    return 'VIDEO';
  } else {
    return 'UNKNOWN';
  }
};

const Media = mongoose.model('Media', mediaSchema, 'media');

module.exports = {
  validateMedia,
  Media,
  getMediaType,
};
