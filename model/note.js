// require mongoose
var mongoose = require('mongoose');

// define schema
var Schema = mongoose.Schema;

var NoteSchema = new Schema (
    {
        summary: {type: String, required: true},
        message: {type: String, required: true},
        created: {type: Date},
        createdby: { type: Schema.Types.ObjectID, ref: 'User'},
        active: {type: Boolean},
    }
);

// virtual

NoteSchema
.virtual('sincecreated')
.get(function () {
    var today = new Date();
    return (today - this.created).toString();
});

NoteSchema
.virtual('url')
.get(function () {
    return ('/notes/' + this._id);
});

// export model
module.exports = mongoose.model('Note', NoteSchema );