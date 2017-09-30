var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', homeController.home_get);

/* POST home page. */
router.post('/', function(req, res, next){
  res.json({ message: req.body.message });
});

module.exports = router;
