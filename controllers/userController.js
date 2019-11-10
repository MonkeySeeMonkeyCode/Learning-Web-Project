var User = require('../model/user');

// display list of users
exports.user_list = function(req, res) {
    res.send('to impliment users list');
};

// display detail page for a specific user
exports.user_detail = function(req, res) {
    res.send('to impliment user detail for ' + req.params.id);
};

// display user create form on GET
exports.user_create_get = function(req, res) {
    res.send('to impliment user create GET');
};

// handle user create on POST
exports.user_create_post = function(req, res) {
    res.send('to impliment user create POST');
};

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