var User = require('../model/user');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// display list of users
exports.user_list = function(req, res) {
    res.send('to impliment users list');
};

// display detail page for a specific user
exports.user_detail = function(req, res) {
    res.send('to impliment user detail for ' + req.params.id);
};

// display user create form on GET
exports.user_create_get = function(req, res, next) {
    res.render('user_form', { title: 'Create User'});
};

// handle user create on POST
exports.user_create_post = [

    // validate fields
    body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.')
        .isAlphanumeric().withMessage('Name has non-alphanumberic characters.'),
    body('nickname').isLength({ min: 1 }).trim().withMessage('Nickname must be specified')
        .isAlphanumeric().withMessage('Nickname has non-alphanumeric characters.'),

    // sanitize fields
    sanitizeBody('name').escape(),
    sanitizeBody('nickname').escape(),

    // process request after validation and sanitiziation
    (req, res, next) => {

        // extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // there are errors, render form again with sanitized values/error messages.
            res.render('user_form', { title: 'Create User', user: req.body, errors: errors.array() });
            return;
        }
        else {
            // date from form is valid.

            // createa a User object with escaped and trimmed data.
            let date = new Date();
            var user = new User(
                {
                    name: req.body.name,
                    nickname: req.body.nickname,
                    created: date,
                    active: true,
                }
            );
            user.save(function (err) {
                if (err) {return next(err); }
                // successful - redirect to user lists.
                res.redirect('/users');
            });
        }
    }
];

// display user delete form on GET
exports.user_delete_get = function(req, res) {
    res.send('to impliment user delete GET');
};

// handle user delete on POST
exports.user_delete_post = function(req, res) {
    res.send('to impliment user delete POST');
};

// display user update form on GET
exports.user_update_get = function(req, res) {
    res.send('to impliment user update GET');
};

// handle user update on POST
exports.user_update_post = function(req, res) {
    res.send('to impliment user create POST');
};