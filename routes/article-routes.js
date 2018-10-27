//Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");

// Route 1
// =======
// This route will retrieve all of the unsaved articles from the articles collection as a json
router.get("/unsaved-articles", function(req,res) {
  db.Article.find( {saved: false}, function(error, data) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(data);
    }
  });
});

// Route 2
// =======
// This route will delete all of the unsaved articles from the articles collection
router.get('/clear-unsaved', (req, res) => {
  console.log("You are inside of article-router.js, '/clear-unsaved'")
  db.Article.deleteMany({"saved": false}).then(dbArticles => {
    res.send(dbArticles);
  }).catch(err => {
    console.log(err);
  });
});

/*
// Route 3
// =======
// This route will retrieve all of the saved articles from the articles collection as a json
router.get("/saved-articles", function(req,res) {
  db.Article.find( {"saved": true}, function(error, data) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(data);
    }
  });
});
*/


// Route 4
// =======
// This route will delete one of the saved articles from the articles collection
router.post("/delete-article/:id", function(req,res) {
  console.log("You are inside of /delete-article/:id"); 
  db.Article.deleteOne(
    {
      _id: req.params.id
    }
  ).then(function(response) {
    console.log("article was deleted");
    res.end();
  }).catch(function(err) {
    res.writeContinue(err);
  });
});  

// Route 5
// =======
// This route will change the "saved" variable of one article to "true"
router.post("/save-article/:id", function(req,res) { 
  console.log("You are inside of /save-article/:id");
  db.Article.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: {saved: true}
    }
  ).then(function(dbArticle) {
    console.log("dbArticle = " + dbArticle);
    res.json(dbArticle);
  }).catch(function(err) {
    res.writeContinue(err);
  });
});

// Route 6
// =======
// This route will delete all of the saved articles from the articles collection
router.get('/clear-saved', (req, res) => {
  console.log("You are inside of article-router.js, '/clear-saved'")
  db.Article.deleteMany({"saved": true}).then(dbArticles => {
    res.send(dbArticles);
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;