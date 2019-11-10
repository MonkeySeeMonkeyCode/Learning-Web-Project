var express = require('express');
var router = express.Router();

// require controller modules
var note_controller = require('../controllers/noteController');
var user_controller = require('../controllers/userController');

/// NOTE ROUTES ///

/* GET notes listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a notes resource');
});

module.exports = router;
