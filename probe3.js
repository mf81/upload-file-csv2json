const fs = require("fs");
const config = require("config");
const csv = require("csvtojson/v2");

const csvjson = require("csvjson");

csv({ delimiter: ";" })
  .fromFile(config.get("csvFile"))
  .then(jsonObj => {
    fs.writeFile(config.get("jsonFile"), jsonObj.toString(), err => {
      if (err) return console.log(err);
      console.log(jsonObj);
    });
  });
