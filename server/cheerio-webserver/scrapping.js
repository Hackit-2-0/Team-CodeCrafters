const request = require("request");
const cheerio = require("cheerio");

module.exports.query = function(queryObject) {
  const q = new Query(queryObject);
  return q.getJobs();
};

function Query(qo) {
  this.host = qo.host || "www.indeed.com";
  this.query = qo.query || "";
  this.city = qo.city || "";
  this.radius = qo.radius || "25";
  this.level = qo.level || "";
  this.maxAge = qo.maxAge || "";
  this.sort = qo.sort || "";
  this.jobType = qo.jobType || "";
  this.excludeSponsored = qo.excludeSponsored || false;

  this.start = 0;
  this.limit = Number(qo.limit) || 0;
}

Query.prototype.url = function() {
  let q = "https://" + this.host + "/jobs";
  q += "?q=" + this.query;
  q += "&l=" + this._cityNameForWeb();
  q += "&radius=" + this.radius;
  q += "&explvl=" + this.level;
  q += "&fromage=" + this.maxAge;
  q += "&sort=" + this.sort;
  q += "&jt=" + this.jobType;
  q += "&start=" + this.start;
  return q;
};
Query.prototype._cityNameForWeb = function() {
  return this.city.replace(" ", "+").replace(",", "%2C");
};

Query.prototype.getJobs = function() {
  const excludeSponsored = this.excludeSponsored;
  return new Promise((resolve, reject) => {
    function getSomeJobs(self, jobs) {
      request(self.url(), (error, response, body) => {
        const parsed = parseJobList(body, self.host, excludeSponsored);
        jobs = jobs.concat(parsed.jobs);
        if (parsed.error !== null) {
          reject(Error);
        } else if (parsed.continue === true) {
          if (self.limit != 0 && jobs.length > self.limit) {
            while (jobs.length != self.limit) jobs.pop();
            resolve(jobs);
          } else {
            console.log(self.start);
            // the start time is
            self.start += 10;
            getSomeJobs(self, jobs);
          }
        } else {
          resolve(jobs);
        }
      });
    }
    getSomeJobs(this, []);
  });
};

function parseJobList(body, host, excludeSponsored) {
  const $ = cheerio.load(body);
  const jobTable = $("#resultsCol");
  const jobs = jobTable.find(".result");
  let cont = true;

  const filtered = excludeSponsored
    ? jobs.filter((_, e) => {
        const job = $(e);
        const footer = job.find(".jobsearch-SerpJobCard-footer");
        const spanText = Array.from(
          footer.find("span").map((_, span) => $(span).text())
        );
        const isSponsered = spanText.some(text =>
          text.toLowerCase().includes("sponsored")
        );
        return !isSponsered;
      })
    : jobs;

  const jobObjects = filtered
    .map((i, e) => {
      const job = $(e);

      const jobtitle = job
        .find(".jobtitle")
        .text()
        .trim();

      const url = "https://" + host + job.find(".jobtitle").attr("href");

      const summary = job
        .find(".summary")
        .text()
        .trim();

      const company =
        job
          .find(".company")
          .text()
          .trim() || null;

      const location = job
        .find(".location")
        .text()
        .trim();

      const postDate = job
        .find(".date")
        .text()
        .trim();

      const salary = job
        .find(".salary.no-wrap")
        .text()
        .trim();

      return {
        title: jobtitle,
        summary: summary,
        url: url,
        company: company,
        location: location,
        postDate: postDate,
        salary: salary
      };
    })
    .get();

  if (jobTable.children().hasClass("dupetext")) {
    cont = false;
  } else if ($(".pagination > *:last-child").hasClass("np")) {
    cont = false;
  }

  return {
    error: null,
    continue: cont,
    jobs: jobObjects
  };
}
