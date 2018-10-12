var express = require("express");

var router = express.Router();

// Import the model (Article.js) to use its database functions.
var Article = require("../models/Article.js");

// Create all our routes and set up logic within those routes where required.
/*
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {  // "affected"? or "changed"?
      // If no rows were affected, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.deleteOne(condition, function(result) {
    if (result.affectedRows == 0) {  // "affected"? or "changed"?
      // If no rows were affected, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
*/

console.log("this is inside articles_controller");

router.get("/", function(req, res) {

  db.Article.find({}, function(error, data) {
    console.log("This is the Main Route (main + index)");
    var hbsObject = {
      Article: data
    };
    res.render("index", hbsObject);

/*    Article.selectAll(function(data) {
      var hbsObject = {
        Article: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
*/
    });
  });

// Export routes for server.js to use.
module.exports = router;
