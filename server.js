// Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var path = require("path");

// Require all routes
var indexRoutes = require("./routes/index-routes");
var scraperRoute = require("./routes/scraper-route.js");
var articleRoutes = require("./routes/article-routes.js");
var noteRoutes = require("./routes/note-routes");

// Require all models
var db = require("./models");

// Set the PORT variable
var PORT = process.env.PORT || 3005;

// Initialize Express 
var app = express();

// turn on debugging so you can see what's being sent to mongodb
mongoose.set("debug", true);

// Configure middleware

  // Set Handlebars
  app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
  app.set('view engine', 'handlebars')

  // Use morgan logger for logging requests
  app.use(logger("dev"));

  // Parse request body as JSON
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Make public a static folder
  //app.use(express.static("public"));
  app.use(express.static(path.join(__dirname, "/public")));
  
// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/KLOVENews";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect("mongodb://localhost/KLOVENews", { useNewUrlParser: true });

// Use all routes
app.use(indexRoutes);
app.use(scraperRoute);
app.use(articleRoutes);
app.use(noteRoutes);

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
