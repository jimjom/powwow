var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController');
var gameControllerTest = require('../controllers/test/gameControllerTest');

router.get('/create', gameController.game_create_get);

router.get('/:id', gameController.game_get);

router.get('/', gameController.game_list_get);

router.get('/test/:id', gameControllerTest.game_test_get);

router.post('/create', gameController.game_create_post);

router.post('/delete/:id', gameController.game_delete_post);

module.exports = router;
