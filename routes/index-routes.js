var express = require("express");
var router = express.Router();
var db = require("../models");

// Main route (display main + index handlebars)
router.get("/", function(req, res) {
  db.Article.find( {saved: false}, function(error, data) {
    console.log("This is the Main Route (main + index)");
    var hbsObject = {
      articles: data
    };
    res.render("index", hbsObject);
  });
});

// Saved Article Route (display main + index2 handlebars)
router.get("/saved", function(req, res) {
  db.Article.find({saved: true})
    // Specify that we want to populate the retrieved Article with any associated notes
    .populate("notes")
    .then(function(dbArticle) {
      // If able to successfully find and associate all Users and Notes, send them back to the client
      console.log("This is the Main Route (main + index2)", dbArticle);
      var hbsObject = {
        articles: dbArticle
      };
      res.render("index2", hbsObject);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.writeContinue(err);
    });
});

module.exports = router;
