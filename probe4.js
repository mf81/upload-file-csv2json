const createReadStream = require("fs").createReadStream;
const createWriteStream = require("fs").createWriteStream;
const csvjson = require("csvjson");

const options = {
  delimiter: ";" // optional
  // quote     : '"' // optional
};

const config = require("config");

const toObject = csvjson.stream.toObject(options);
const stringify = csvjson.stream.stringify();
createReadStream(config.get("csvFile"), "utf-8")
  .pipe(toObject)
  .pipe(stringify)
  .pipe(createWriteStream(config.get("jsonFile")));
