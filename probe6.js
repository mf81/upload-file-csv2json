const fs = require("fs");
const { Transform } = require("stream");
const config = require("config");
const csvjson = require("csvjson");
const csv = require("csvtojson");
const csv2json = require("csv2json");

// const upperCaseTransform = new Transform({
//   transform: (chunk, encoding, done) => {
//     //const result = chunk.toString().toUpperCase();

//     const json = csvjson.toObject(chunk.toString(), { delimiter: ";" });
//     const result = JSON.stringify(json);
//     done(null, result);
//   }
// });
// const upperCaseTransform = new Transform({
//   transform: (chunk, encoding, done) => {
//     //const result = chunk.toString().toUpperCase();

//     // const part = chunk.toString() + "PART";
//     // const json = csvjson.toObject(part, { delimiter: ";" });
//     // const result = JSON.stringify(json);

//     csv({ delimiter: ";" })
//       .fromString(chunk.toString())
//       .then(jsonObj => {
//         const result = JSON.stringify(jsonObj);
//         done(null, result);
//       });
//   }
// });

const strm = fs
  .createReadStream(config.get("csvFile"))
  .pipe(csv2json({ separator: ";" }))
  .pipe(fs.createWriteStream(config.get("jsonFile")));

strm.on("finish", () => console.log("koniec"));
//   const result = await csvjson.toObject(jsonData, { delimiter: ";" });
//   const json = await JSON.stringify(result);
//   await fs.writeFile(config.get("jsonFile"), json);

// csv2json({ separator: ';' });
