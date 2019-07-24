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
  // await Rss.find(docRecords(req.body), (err, doc) => {
  //   const txt = doc.wartosc;
  //   doc.wartosc = txt.replace(".", "");
  //   console.log(doc.wartosc);
  //   doc.save(callback);
  // });

  const data = await Rss.find(docRecords(req.body)).select("-_id -__v");
  const count = await Rss.find(docRecords(req.body)).countDocuments();

  const metaData = {
    countCases: new String(count),
    data
  };

  //console.log(JSON.stringify(metaData, 1, 1));

  res.send(JSON.stringify(metaData, 2, 1));
});

function docRecords(body) {
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
  } = body;

  return {
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
}

module.exports = router;
