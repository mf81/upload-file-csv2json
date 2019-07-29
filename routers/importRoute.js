const auth = require("../middleWare/authRoles/authMiddleware");
const admin = require("../middleWare/authRoles/adminMiddleware");
const validate = require("express-validation");
const upload = require("../validation/validationUpload");
const push = require("../middleWare/json/uploadMiddleware");
const get = require("../middleWare/json/getJsonMiddleware");
const fs = require("fs");
const { Rss, validateRss } = require("../models/rssModel");
const config = require("config");
const express = require("express");
const router = express.Router();

router.get("/get", [auth, admin, get], (req, res) => {});

router.post("/upload", [auth, admin, validate(upload), push], (req, res) => {});

router.get("/db", [auth, admin], async (req, res) => {
  fs.readFile(config.get("jsonFile"), async (err, rssData) => {
    if (err) return res.status(404).send("File not found.");
    const rss = await JSON.parse(rssData);
    await Rss.insertMany(rss);
  });
  res.send("Add to DB");
});

module.exports = router;
