const validate = require("express-validation");
const upload = require("../validation/validationUpload");
const push = require("../middleWare/uploadMiddleware");
const get = require("../middleWare/getJsonMiddleware");
const fs = require("fs");
const { Rss, validateRss } = require("../models/rssModel");
const config = require("config");
const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

router.get("/", async (req, res) => {
  const rss = await Rss.find();
  res.send(rss);
});

router.get("/id/:id", validateObjectId, async (req, res) => {
  const rss = await Rss.findById(req.params.id);
  if (!rss) return res.status(404).send("No ID find");
  res.send(rss);
});

router.get("/findby", async (req, res) => {
  rss = await Rss.find({
    $and: [
      {
        nr: req.query.nr
      },
      {
        rok: req.query.rok
      }
    ]
  });

  res.send(rss);
});

router.get("/findbyjson", async (req, res) => {
  let {
    nr,
    rok,
    imieNazwisko,
    adres,
    nrDW,
    rokDW,
    sygnaturaNakaz,
    sygnaturaSprzeciw,
    sygnaturaApelacja
  } = req.body;

  if (imieNazwisko) {
    const re = new RegExp("(.+)\\s(.+)\\s$");
    re.test(imieNazwisko) ? (imieNazwisko += " ") : imieNazwisko;
  }

  const findQuery = {
    nr: new RegExp(nr, "i"),
    rok: new RegExp(rok, "i"),
    imieNazwisko: new RegExp(imieNazwisko, "i"),
    adres: new RegExp(adres, "i"),
    nrDW: new RegExp(nrDW, "i"),
    rokDW: new RegExp(rokDW, "i"),
    sygnaturaNakaz: new RegExp(sygnaturaNakaz, "i"),
    sygnaturaSprzeciw: new RegExp(sygnaturaSprzeciw, "i"),
    sygnaturaApelacja: new RegExp(sygnaturaApelacja, "i")
  };

  rss = await Rss.find(findQuery);
  res.send(rss);
});

module.exports = router;
