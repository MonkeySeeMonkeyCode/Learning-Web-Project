var Note = require('../model/note');

// display list of notes
exports.note_list = function(req, res, next) {
    let now = new Date();
    //temporary array of notes to be deleted
    list_note = [
        {
            summary: 'Finish project',
            message: 'finish up notes project',
            created: now,
            createdby: 'Brian',
            active: true,
            noteurl: "/notes/1",
            userurl: "/users/123"
        },
        {
            summary: 'Schedule appointment',
            message: 'schedule an appointment to view house',
            created: now,
            createdby: 'Brian',
            active: true,
            noteurl: "/notes/2",
            userurl: "/users/123"
        }
        ];
    res.render('note_list', { title: 'List of notes', note_list: list_note });
    // Note.find()
    // .exec(function (err, list_note) {
    //     if (err) {
    //         return next(err);
    //     }
    //     // successful so render
    //     res.render('note_list', { title: 'List of notes', notes_list: list_note });
    // });
};

// display detail page for a specific note
exports.note_detail = function(req, res, next) {
    // res.send('to impliment note detail for ' + req.params.id);
    Note.findById(req.params.id).exec(function (err,results) {
        if (err) {
            // error in api usage
            return next(err);
        }
        if (results.note==null) {
            // no results
            var err = new Error('Note not found');
            err.status = 404;
            return next(err);
        }
        // successful so render
        res.render('note_detail', {title: 'Note Detail', note: results.note})
    });
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