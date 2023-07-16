const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getUsers, getCurrentUser, getUser, updateProfile, updateAvatar,
} = require('../controllers/users');

const { linkRegExp } = require('../utils/constants');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegExp),
  }),
}), updateAvatar);

module.exports = router;
