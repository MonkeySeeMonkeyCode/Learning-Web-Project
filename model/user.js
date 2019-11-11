// require mongoose
var mongoose = require('mongoose');

// define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema (
    {
        name: {type: String, required: true, max: 100},
        nickname: {type: String},
        created: {type: Date},
        active: {type: Boolean},
    }
);

//virtual

UserSchema
.virtual('sincecreated')
.get(function () {
    var today = new Date();
    return (today - this.created).toString();
});

UserSchema
.virtual('url')
.get(function () {
    return '/user/' + this._id;
});

// export model
module.exports = mongoose.model('User', UserSchema );

