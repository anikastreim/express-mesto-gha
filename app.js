const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');

const { createUser, login } = require('./controllers/users');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(DB_URL);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use(errors());
app.use(errorHandler);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.listen(PORT);
