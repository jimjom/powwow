var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.user_get);

router.post('/', userController.user_post);

//router.post('/user_login', userController.user_post);

module.exports = router;
