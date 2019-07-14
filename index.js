const express = require("express");
const validate = require("express-validation");
const upload = require("./validation/validationUpload");
const push = require("./middleWare/uploadMiddleware");
const get = require("./middleWare/getJsonMiddleWare");
const config = require("config");
const loggerWinston = require("./startup/winston");
const fs = require("fs");
const { Rss, validateRss } = require("./models/rssModel");
const csv2json = require("csv2json");

const csvjson = require("csvjson");

const app = express();
app.use(express.json());

require("./startup/db")();

app.get("/api/csv/get", get, (req, res) => {});

app.post("/api/csv/upload", [validate(upload), push], (req, res) => {
  res.send("File saved...");
});

app.get("/api/csv/json", async (req, res) => {
  // const jsonData = await fs.readFile(config.get("csvFile"), {
  //   encoding: "utf8"
  // });

  // const result = await csvjson.toObject(jsonData, { delimiter: ";" });
  // const json = await JSON.stringify(result);
  // await fs.writeFile(config.get("jsonFile"), json);

  fs.createReadStream(config.get("csvFile"))
    .pipe(
      csv2json({
        separator: ";"
      })
    )
    .pipe(fs.createWriteStream(config.get("jsonFile")));

  //strm.on("finish", () => res.send("File saved..."));
  res.send("File saved...");
});

app.get("/api/csv/db", async (req, res) => {
  fs.readFile(config.get("jsonFile"), async (err, rssData) => {
    if (err) return console.log(err);
    let rss = await JSON.parse(rssData);
    await Rss.insertMany(rss);
  });
  res.send("Add to DB");
});

const PORT = config.get("PORT");

const port = process.env.PORT || PORT || 3000;
const server = app.listen(port, () => {
  loggerWinston().info(`Lisning on port: ${port}`);
});

module.exports = server;
