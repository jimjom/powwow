var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');

router.get('/create', gameController.game_create_get);

router.get('/:id', gameController.game_get);

router.get('/', gameController.game_list_get);

router.post('/create', gameController.game_create_post);

router.post('/delete/:id', gameController.game_delete_post);

module.exports = router;
