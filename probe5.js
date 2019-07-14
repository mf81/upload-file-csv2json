const fs = require("fs");
const config = require("config");
const csvjson = require("csvjson");

var options = {
  delimiter: ";"
};

fs.readFile(config.get("csvFile"), { encoding: "utf8" }, (err, data) => {
  if (err) return console.log(err);
  const res = csvjson.toObject(data, options);
  const json = JSON.stringify(res);
  fs.writeFile(config.get("jsonFile"), json, err => {
    if (err) return console.log(err);
    console.log("OK");
  });
});
