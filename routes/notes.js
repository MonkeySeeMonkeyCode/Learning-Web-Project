var express = require('express');
var router = express.Router();

// require controller modules
var note_controller = require('../controllers/noteController');
var user_controller = require('../controllers/userController');

/// NOTE ROUTES ///

/* GET lists of notes. */
router.get('/', note_controller.note_list);

/* GET create notes form */
router.get('/create', note_controller.note_create_get);

/* POST create notes form */
router.post('/create', note_controller.note_create_post);

/* GET note details. */
router.get('/:id', note_controller.note_detail);

/* GET delete notes form */
router.get('/:id/delete', note_controller.note_delete_get);

/* POST delete notes form */
router.post('/:id/delete', note_controller.note_delete_post);

/* GET update notes form */
router.get('/:id/update', note_controller.note_update_get);

/* POST update notes form */
router.post('/:id/update', note_controller.note_update_post);

module.exports = router;
