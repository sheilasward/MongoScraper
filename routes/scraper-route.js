//Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

/*
// Database configuration
var databaseUrl = "FoxNews";
var collections = ["articles"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

*/
// Scrape News Articles from Fox News
router.get("/scrape", function(req,res) {
  axios.get("https://www.foxnews.com/").then(function(response) {
    var $ = cheerio.load(response.data);
    $("main.main-content").find("article.article").each(function(i, element) { 
      var imgLink = $(element).find("picture").children().attr("src");
      var title = $(element).find("h2.title").children().text();
      var link = $(element).find("h2.title").children().attr("href");
      if (title && link) {
        db.articles.insert({
          title: title,
          link: link,
          imgLink: imgLink,
          saved: false
        }, function(err, inserted) {
          if (err) {
            console.log(err);
          } else {
            console.log(inserted);
          }
        });
      }
    });
    res.end("Scrape Complete");
  });
});

module.exports = router;
  