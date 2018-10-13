var db = require("../models");
var router = require('express').Router();

// Main route (display main + index handlebars)
router.get("/", function(req, res) {
  
    db.Article.find({}, function(error, data) {
      console.log("This is the Main Route (main + index)");
      var hbsObject = {
        articles: data
      };
      console.log(JSON.stringify(hbsObject));
      res.render("index", hbsObject);
    });
  });

module.exports = router;