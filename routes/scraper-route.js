//Dependencies
var express = require("express");
var router = express.Router();
var db = require("../models");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// Scrape News Articles from KLOVE Trending News
router.get("/scrape", function(req,res) { 
  console.log("You are inside of scraper-route.js scrape")
  axios.get("http://www.klove.com/news/trending-news/").then(function(response) {
    var $ = cheerio.load(response.data);
    $("div#trending-news").find("div.news-item").each(function(i, element) {
      var result = {};
      if (i != 0) {
        result.imgLink = $(element).find("img").attr("src");
        result.kicker = $(element).find("div.summary-text").text();
        result.title = $(element).find("div.headline-text").text();
        result.link = $(element).find("a").attr("href");
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
  