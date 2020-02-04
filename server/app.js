const express = require("express");
const bodyParser = require("body-parser");
const jsonfile = require("jsonfile");
const cors = require("cors");
const path = require("path");
const uuid = require("uuid");
let fs = require("fs");
const Axios = require("axios");
const { secretKey } = require("./config/config");

const conver = require("convertapi")(secretKey);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "./assets/files")));
app.use(bodyParser.json());
app.use("/scraper", require("./scraper.js"));

app.get("/", (req, res) => {
  console.log("server is configured");
  res.send("server is teste");
});

fs.writeFile("../Classificatioons/user.txt", "", err => {
  if (err) {
    console.log(err);
  }
});

app.post("/Image", (req, res) => {
  console.log(req.body);
  const multer = require("multer");
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "server/assets/files");
    },
    filename: (req, file, cb) => {
      cb(null, Math.random() + "-" + Date.now());
    }
  });
  var upload = multer({ storage: storage });
  conver
    .convert(
      "txt",
      {
        File: req.body.link
      },
      "pdf"
    )
    .then(data => {
      // data.saveFiles("./assets/files");
      console.log("file created");
      data.saveFiles("../Classificatioons/user.txt");
    });
  // tips
});

app.post("/UserData", (req, res) => {
  console.log(req.body);
  fs.exists("../Classificatioons/data.json", exists => {
    if (exists) {
      console.log("cannot exists");
    } else {
      fs.write("../Classificatioons/data.json", { data: req.body }, succes => {
        console.log("file has written to it");
      });
    }
  });
  fs.readFile("./assets/data.json", function(err, data) {
    if (err) {
      console.log(err);
    }
    const arr = JSON.parse(data);
    arr.push(req.body);
    fs.writeFileSync("./assets/data.json", JSON.stringify(arr));
  });
  res.json(req.body);
});

Axios.get(
  "https://api.codetabs.com/v1/proxy?quest=http://localhost:8000/app"
).then(data => {
  const val = data.data;
  if (val.category === "no source file there") {
    console.log("no data is present");
  } else {
    console.log(val);
  }
});

// mlModel
app.post("/MlModel", (req, res) => {
  console.log("posting here");
  const dataMake = req.body;

  const { Train } = require("./assets/train");
  const output = Train(req.body.data);
  // console.log(output);
  const jsonFile = require("./assets/scrapper.json");
  const final = [];
  let ct = 0;

  const arrr = [];
  for (let i = 0; i < jsonFile.length; i++) {
    let check = 0;
    if (jsonFile[i].newskills !== undefined) {
      const { newskills } = jsonFile[i];
      for (let i = 0; i < newskills.length; i++) {
        if (newskills[i].category === output.predictedCategory) {
          check++;
          arrr.push(check);
        }
        break;
      }
    }
  }

  // console.log(jsonFile.length);

  res.json(jsonFile);
});

const port = process.env.PORT || 5000;

app.listen(port);
