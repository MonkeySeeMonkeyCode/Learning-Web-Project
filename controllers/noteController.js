var Note = require('../model/note');
var User = require('../model/user');

const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

var async = require('async');

// display list of notes
exports.note_list = function(req, res, next) {

    Note.find()
    .populate('createdby')
    .exec(function (err, list_note) {
        if (err) {
            return next(err);
        }
        // successful so render
        res.render('note_list', { title: 'List of notes', note_list: list_note });
    });
};

// display detail page for a specific note
exports.note_detail = function(req, res, next) {
    Note.findById(req.params.id)
    .populate('createdby')
    .exec(function (err,results) {
        if (err) {
            // error in api usage
            return next(err);
        }
        if (results==null) {
            // no results
            var err = new Error('Note not found');
            err.status = 404;
            return next(err);
        }
        // successful so render
        res.render('note_detail', {title: 'Note Detail', note: results})
    });
};

// display note create form on GET
exports.note_create_get = function(req, res) {

    User.find().exec(function (err, list_user) {
        if (err) {
            return next(err);
        }
        res.render('note_form', { title: 'Create note', users: list_user});
    })
};

// handle note create on POST
exports.note_create_post = [

    // validate fields.
    body('summary').isLength({ min: 1}).trim().withMessage('Please enter a title.'),
    body('message').isLength({ min: 1}).trim().withMessage('Please enter a message.'),
    body('createby').isLength({ min: 1}).trim().withMessage('Please select a user.'),

    // sanitize fields
    sanitizeBody('summary').escape(),
    sanitizeBody('message').escape(),
    sanitizeBody('createby').escape(),

    // process request after validation and sanitization
    (req, res, next) => {
        
        // extract the validation errors from a request

        const errors = validationResult(req);
        let now = new Date();
        var note = new Note(
            {
                summary: req.body.summary,
                message: req.body.message,
                created: now,
                createdby: req.body.createby,
                active: true,
            }
        );

        if (!errors.isEmpty()) {
            // there are errors, render form again with sanitized values/error message

            // get users to return back to form
            User.find().exec(function (err, results) {
                if (err) {
                    return next(err);
                }
                res.render('note_form', { title: 'Create note', note: note, error: errors, users: results});
                return;
            });
        }
        else {
            // data from form is valid. save note
            note.save(function (err) {
                if (err) {
                    return next(err);
                }
                // sucessful - redirect to 
                res.redirect('/notes/');
            });
        }
    }
];

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