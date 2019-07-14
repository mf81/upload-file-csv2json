const csvFilePath = "./tmpy/data2.json";
const csvFilePathSave = "./tmpy/data3.json";
const csv = require("csvtojson");
const fs = require("fs");
csv({ delimiter: ";" })
  .fromFile(csvFilePath)
  .then(jsonObj => {
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */
  });
const file = fs.createReadStream(csvFilePath);
const fileToSave = fs.createWriteStream(csvFilePathSave);
file.pipe(csv({ delimiter: ";" })).pipe(fileToSave);
