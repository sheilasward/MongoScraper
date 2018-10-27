var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ArticleSchema object
var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	imgLink: {
			type: String,
			required: true
	},
	kicker: {
		type: String
	},
	saved: {
		type: Boolean,
		default: false
	},
	// `notes` is an array that stores ObjectIds
	// The ref property links these ObjectIds to the Note model
	// This allows us to populate the Article with any associated notes
	notes: [
	  {
		type: Schema.Types.ObjectId,
		ref: "Note"
	  }
	]
});

// This creates the Article model from the ArticleSchema above
var Article = mongoose.model("articles", ArticleSchema);

// Export the Article model
module.exports = Article;