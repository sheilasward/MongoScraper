//Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");

// Scraping tools
var rp = require("request-promise");
var cheerio = require("cheerio");

// Scrape News Articles from KLOVE Trending News
router.get("/scrape", function(req,res) { 
  console.log("You are inside of scraper-route.js scrape")
  rp.get("https://ww2.klove.com/news/").then(function(response) {
    var $ = cheerio.load(response);
    $("div#news-cards").find("a").each(function(i, element) {
      var result = {};
      if (i != 0) {
        result.imgLink = $(element).find("img").attr("src");
        result.kicker = $(element).find("p.card-subtitle").text();
        result.title = $(element).find("h5.card-title").text();
        result.link = $(element).attr("href");
        if (result.imgLink && result.kicker && result.title && result.link) {
          db.Article.create(result).then(function(dbArticle) {
            console.log("article was inserted: " + dbArticle);
          }).catch(function(err) {
            res.writeContinue(err);
          });
        }
      }
    });
    res.end("Scrape Completed");;
  });

});

module.exports = router;
  