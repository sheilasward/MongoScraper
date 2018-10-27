
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
var NoteSchema = new Schema({
	noteBody: {
        type: String,
        required: true
    }
});

// This creates the Article model from the ArticleSchema above
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;