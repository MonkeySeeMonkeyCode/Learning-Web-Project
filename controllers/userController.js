var User = require('../model/user');
const { body,validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

// display list of users
exports.user_list = function(req, res, next) {
    
    User.find()
    .exec(function (err, list_user) {
        if (err) { return next(err); }
        // successful so render
        res.render('user_list', { title: 'User List', user_list: list_user });
    })
};

// display detail page for a specific user
exports.user_detail = function(req, res, next) {
    User.findById(req.params.id).exec(function (err, results) {
        if (err) {
            // error in API usuage
            return next(err);
        };
        if (results==null) {
            // no results
            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        // successful so render
        res.render('user_detail', { title: 'User detail', user: results});
    });
};

// display user create form on GET
exports.user_create_get = function(req, res, next) {
    res.render('user_form', { title: 'Create User'});
};

// handle user create on POST
exports.user_create_post = [

    // validate fields
    body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
        // .isAlphanumeric().withMessage('Name has non-alphanumberic characters.'),
    body('nickname').isLength({ min: 1 }).trim().withMessage('Nickname must be specified'),
        // .isAlphanumeric().withMessage('Nickname has non-alphanumeric characters.'),

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
    User.findById(req.params.id)
    .exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (user==null) {//no result
            res.redirect('/users');
        }
        // success so render
        res.render('user_delete', { title: 'Delete User', user: user});
    });
};

// handle user delete on POST
exports.user_delete_post = function(req, res) {
    User.findById(req.body.userid)
    .exec(function (err, user) {
        if (err) {
            next(err);
        }
        User.findByIdAndRemove(req.body.userid, function deleteUser(err) {
            if (err) {
                return next(err);
            }
            // success go back to user list
            res.redirect('/users');
        })
    });
};

// display user update form on GET
exports.user_update_get = function(req, res) {
    // res.send('to impliment user update GET ' + req.params.id);
    User.findById(req.params.id)
    .exec(function(err, user) {
        if(err) { 
            return next(err);
        }
        res.render('user_form', { title: 'Update user', user: user});
    });
};

// handle user update on POST
exports.user_update_post = [

    // validate fields
    body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
        // .isAlphanumeric().withMessage('Name has non-alphanumberic characters.'),
    body('nickname').isLength({ min: 1 }).trim().withMessage('Nickname must be specified'),
        // .isAlphanumeric().withMessage('Nickname has non-alphanumeric characters.'),

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
            var user = new User(
                {
                    name: req.body.name,
                    nickname: req.body.nickname,
                    created: req.body.created,
                    active: true, // need to look up how to pass booleans, for now will hard code it
                    _id: req.body._id // need to use old id so new id wont be assigned
                }
                );
            User.findByIdAndUpdate(req.params.id, user, {}, function (err) {
                if (err) {return next(err); }
                // successful - redirect to user lists.
                res.redirect('/users');
            });
        }
    }
];