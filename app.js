const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./errors/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '64a03a7aa9953f33e7921ce1'
  };

  next();
});

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use((req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

app.use(errorHandler);

app.listen(PORT);
