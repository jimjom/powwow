var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');

router.get('/create', gameController.game_create_get);

router.post('/create', gameController.game_create_post);

router.get('/:id', gameController.game_get);

module.exports = router;
