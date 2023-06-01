const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const routerAuth = require('./controllers/auth');
const authMiddleware = require('./middleware/auth');

const routerUsers = require('./controllers/users');
const routerScreens = require('./controllers/screens');
const routerScreensSystemInfo = require('./controllers/screensSystemInfo');
const routerMedia = require('./controllers/media');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json({ limit: '30mb' }));
app.use(express.text({ limit: '30mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition'); // Добавляем заголовок
  next();
});

app.use(bodyParser.json());
app.use(express.json({ extendend: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(routerAuth);
app.use(authMiddleware);
app.use(routerUsers);
app.use(routerScreens);
app.use(routerScreensSystemInfo);
app.use(routerMedia);

mongoose
  .connect('mongodb://localhost:27017/ScheduleMonitorsApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('База данных подключена');
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
