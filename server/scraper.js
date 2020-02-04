const express = require("express");
const router = express.Router();
const axios = require("axios");
const indeed = require("indeed-scraper");
const fs = require("fs");
const { query } = require("./cheerio-webserver/crawler");

// made the custom
const queryOptions = {
  host: "www.indeed.com",
  query: "Software",
  city: "Seattle, WA",
  radius: "25",
  level: "entry_level",
  jobType: "fulltime",
  maxAge: "7",
  sort: "date",
  limit: 10
};
function data(body) {
  const text = this.abj;
  // const { query, city, radius, level, maxage, limit } = text;
  queryOptions.query = body.tech;
  queryOptions.city = body.city;
  queryOptions.radius = body.radius;
  queryOptions.level = body.year;
  queryOptions.maxage = body.age;
  queryOptions.limit = body.limit;
  return true;
}

router.post("/indeed", (req, res) => {
  const datas = data(req.body);
  if (!datas) {
    throw "not correct";
  }
  query(queryOptions).then(rest => {
    console.log(rest);
    res.json(rest);
  });
});

// protected
router.get("/", (req, res) => {
  // scapper for vortex
  axios.get("https://vortex.frapp.in/resume?").then(datas => {
    fs.readFile("./assets/scrapper.json", function(err, data) {
      if (err) {
        console.log(err);
      }
      console.log(datas.data);
      const arr = JSON.parse(data);
      arr.push(datas.data);
      fs.writeFileSync("./assets/scrapper.json", JSON.stringify(datas.data));
    });
  });
});

const make_data = require("./assets/scrapper.json");
// assume the routes exists
router.get("/vac", (req, res) => {
  fs.readFile("./assets/scrapper.json", function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log(make_data);
    res.json(make_data);
  });
});

module.exports = router;
