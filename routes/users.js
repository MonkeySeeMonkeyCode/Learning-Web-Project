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

/* GET user detail. */
router.get('/:id', user_controller.user_detail);

/* GET delete user form */
router.get('/:id/delete', user_controller.user_delete_get);

/* POST delete user form */
router.post('/:id/delete', user_controller.user_delete_post);

/* GET update user form */
router.get('/:id/update', user_controller.user_update_get);

/* POST update user form */
router.post('/:id/update', user_controller.user_update_post);

module.exports = router;
