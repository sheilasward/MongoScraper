//Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");

// Route 1
// =======
// This route will save a note
router.post("/save-note/:id", function(req,res) {
  console.log("req.params.id: " + req.params.id);
  console.log("req.body: " + JSON.stringify(req.body));
  db.Note.create(req.body)
    .then(function(dbNote) {
      console.log("req.body = " + JSON.stringify(req.body));
      return db.Article.findOneAndUpdate({
        _id: req.params.id
      }, { 
        $push: { 
          notes: dbNote._id 
        }}, { 
          new: true 
        }).populate("notes");
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .then(function(dbArticle) {
      console.log("dbArticle with notes " + dbArticle);
      res.redirect("back");
    })
    .catch(function(err) {
      res.writeContinue(err);
  });
});

// Route 2
// =======
// This route will delete a note
router.post("/delete-note/:id", function (req, res) {
  console.log("req.params.id: " + req.params.id);
  db.Note.findByIdAndRemove({ _id: req.params.id })
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({
        "notes": req.params.id 
      }, { 
        "$pull": { "notes": req.params.id } 
      });
    })
    .then(function(dbArticle) {
      console.log("dbArticle with notes " + dbArticle);
      res.redirect("back");
    })
    .catch(function(err) {
      res.writeContinue(err);
    });

  });

module.exports = router;