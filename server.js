// Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var router = require("./routes");
var routes = require("./controllers/articles_controller.js");

/*
var articleRoutes = require("./routes/article-routes");
var scraperRoute = require("./routes/scraper-route");

*/

// Require all models
var db = require("./models");

// Set the PORT variable
var PORT = process.env.PORT || 3000;

// Initialize Express 
var app = express();

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
  app.use(express.static("public"));


//app.use(router);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/FoxNews", { useNewUrlParser: true });


/*
// Define which routes to use
app.use("/all", articleRoutes);
app.use("/scrape", scraperRoute);
*/

// Scrape News Articles from Fox News
app.get("/scrape", function(req,res) {
  axios.get("https://www.foxnews.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    $("main.main-content").find("article.article").each(function(i, element) {
      var result = {};
      result.imgLink = $(this).find("img").attr("src");
      result.title = $(this).find("h2.title").children().text();
      result.link = $(this).find("h2.title").children().attr("href");
      result.saved = false;
      if (result.title && result.link && result.imgLink) {
        db.Article.create(result).then(function(dbArticle) {
          console.log(dbArticle);
        }).catch(function(err) {
          return res.json(err);
        });
      }
    });
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  db.Article.find({}).then(function(dbArticles) {
    res.json(dbArticles);
  }).catch(function(err) {
    res.json(err);
  });
});
/*
// Main route (display main + index handlebars)
app.get("/", function(req, res) {
  
  db.Article.find({}, function(error, data) {
    console.log("This is the Main Route (main + index)");
    var hbsObject = {
      articles: data
    };
    
    res.render("index", hbsObject);
  });
});
*/

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});

/* -/-/-/-/-/-/-/-/-/-/-/-/- */
/*
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var articleRoutes = require("./routes/article");
var indexRoutes = require("./routes/index");
var path = require("path");

// turn on debugging so you can see what's being sent to mongodb
mongoose.set("debug", true);

// morgan is used for automated logging of requests, responses and related data. When added as a middleware to an express/connect app, by default it should log statements to stdout showing details of: remote ip, request method, http version, response status

var PORT = process.env.PORT || 3001;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));

// Set handlebars as the default templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB - uncomment this once .env is setup and working
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to local mongodb
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// Define which routes to use
app.use("/", indexRoutes);
app.use("/articles", articleRoutes);

// Start the server
app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
});
*/