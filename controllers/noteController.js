var Note = require('../model/note');

// display list of notes
exports.note_list = function(req, res) {
    res.send('to impliment notes list');
};

// display detail page for a specific note
exports.note_detail = function(req, res) {
    res.send('to impliment note detail for ' + req.params.id);
};

// display note create form on GET
exports.note_create_get = function(req, res) {
    res.send('to impliment note create GET');
};

// handle note create on POST
exports.note_create_post = function(req, res) {
    res.send('to impliment note create POST');
};

// display note delete form on GET
exports.note_delete_get = function(req, res) {
    res.send('to impliment note delete GET');
};

// handle note delete on POST
exports.note_delete_post = function(req, res) {
    res.send('to impliment note delete POST');
};

// display note update form on GET
exports.note_update_get = function(req, res) {
    res.send('to impliment note update GET');
};

// handle note update on POST
exports.note_update_post = function(req, res) {
    res.send('to impliment note create POST');
};