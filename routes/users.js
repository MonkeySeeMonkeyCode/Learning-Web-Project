var express = require('express');
var router = express.Router();

// require controller modules
var note_controller = require('../controllers/noteController');
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a user resource');
});

module.exports = router;
