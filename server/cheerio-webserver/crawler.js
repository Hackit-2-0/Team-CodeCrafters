const indeedScraper = require("./scrapping");

module.exports.query = function(queryObject) {
  return indeedScraper.query(queryObject);
};
