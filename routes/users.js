var express = require('express');
var router = express.Router();

// require controller modules
var note_controller = require('../controllers/noteController');
var user_controller = require('../controllers/userController');

/* GET list of users. */
router.get('/', user_controller.user_list);

/* GET create user form */
router.get('/create', user_controller.user_create_get);

/* POST create user form */
router.post('/create', user_controller.user_create_post);

module.exports = router;
