const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getUsers, getUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

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
    avatar: Joi.string().required().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]\.[a-zA-Z0-9()]\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/),
  }),
}), updateAvatar);

module.exports = router;
