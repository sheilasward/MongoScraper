//Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");

// Route 1
// =======
// This route will retrieve all of the data from the articles collection as a json
router.get("/all", function(req,res) {
  db.articles.find({}, function(error, data) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(data);
    }
  });
});

router.get("/", function(req, res) {

  db.Article.find({}, function(error, data) {
    console.log("This is the Main Route (main + index)");
    var hbsObject = {
      Article: data
    };
    res.render("index", hbsObject);
    });
  });

module.exports = router;