const validate = require("express-validation");
const upload = require("../validation/validationUpload");
const push = require("../middleWare/uploadMiddleware");
const get = require("../middleWare/getJsonMiddleware");
const fs = require("fs");
const { Rss, validateRss } = require("../models/rssModel");
const config = require("config");
//const csv2json = require("csv2json");
const express = require("express");
const router = express.Router();

router.get("/get", get, (req, res) => {});

router.post("/upload", [validate(upload), push], (req, res) => {});

// router.get("/json", async (req, res) => {
//   fs.createReadStream(config.get("csvFile"))
//     .pipe(
//       csv2json({
//         separator: ";"
//       })
//     )
//     .pipe(fs.createWriteStream(config.get("jsonFile")));
//   res.send("File saved...");
// });

router.get("/db", async (req, res) => {
  fs.readFile(config.get("jsonFile"), async (err, rssData) => {
    if (err) return res.status(404).send("File not found.");
    const rss = await JSON.parse(rssData);
    await Rss.insertMany(rss);
  });
  res.send("Add to DB");
});

module.exports = router;
