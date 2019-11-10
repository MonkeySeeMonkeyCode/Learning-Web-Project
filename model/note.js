// require mongoose
var mongoose = require('mongoose');

// define schema
var Schema = mongoose.Schema;

var NoteSchema = new Schema ({
    summary: {type: String, required: true},
    message: {type: String, required: true},
    created: {type: Date},
    createdby: { type: Schema.Types.ObjectID, ref: 'User'},
    active: {type: Boolean},
});

NoteSchema
.virtual('sincecreated')
.get(function () {
    var today = new Date();
    return (today - this.created).toString();
});

// compile model from schema
var Note = mongoose.model('Note', NoteSchema );