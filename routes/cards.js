const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.get('/:userId', deleteCard);
router.put('/:userId/likes', likeCard);
router.delete('/:userId/likes', dislikeCard);

module.exports = router;
