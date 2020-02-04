const ap = require("./scrapper.json");
const trainData = JSON.stringify(ap);
const bayes = require("classificator");

const classifier = bayes();
const fs = require("fs");

function TrainScrapedData(input) {
  console.log(input);
  for (let i = 0; i < ap.length; i++) {
    console.log(ap[i].id);
    if (ap[i].skills) {
      const str = ap[i].skills;
      for (let m = 0; m < ap[i].skills.length; m++) {
        const left = ap[i].skills[m].split(":")[0];
        const right = ap[i].skills[m].split(":")[1];
        classifier.learn(right, left);
      }
    }
    //   console.log(ap[i].skills);
    if (ap[i].newskills) {
      for (let k = 0; k < ap[i].newskills.length; k++) {
        classifier.learn(ap[i].newskills[k].name, ap[i].newskills[k].category);
      }
    }
  }
  const data = classifier.categorize(input);
  return data;
}

function CustomScrapper() {
  console.log("load-local");
  const local = require("./data.json");
  const firstData = require("./files/ag.txt");
  fs.readFile("./files/ag.txt", "utf8", function(err, data) {
    if (err) throw err;
    const str = data;
    if (str.includes("TECHNICAL SKILLS") || str.includes("technical skills")) {
      const index = str.indexOf("TECHNICAL SKILLS");
      const extract = str.substring(index, index + 70);
      console.log(extract);
      return extract;
    }
  });
}

function FormDataJson() {
  console.log("tarin custom formDat");
  const formData = require("../assets/data.json");

  if (formData.length < 10) {
    alert("form cannot be trained on soo small data");
  } else {
    for (let k = 0; k < formData.length; k++) {
      const skills = formData.userLiked;
      if (skills.length > 0) {
        for (let num = 0; num < skills.length; num++) {}
      }
    }
  }
}

module.exports.Train = TrainScrapedData;
module.exports.NewJsonTrain = CustomScrapper;
module.exports.FormDataJson = FormDataJson;

// CustomScrapper();
