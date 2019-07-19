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
  //   rss = await Rss.find({
  //     nr: req.query.nr,
  //     rok: req.query.rok
  //   });

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

router.get("/findmf", async (req, res) => {
  //   rss = await Rss.find({
  //     nr: req.query.nr,
  //     rok: req.query.rok
  //   });
  console.log(req.query.imienazwisko);

  //   const rss = await Rss.find({
  //     imieNazwisko: { $regex: /Tadeusz/, $options: "i" }
  //   });
  console.log(new RegExp(req.query.imienazwisko));
  const rss = await Rss.find({
    imieNazwisko: new RegExp(req.query.imienazwisko, "i")
  });

  //{$match: { $or: [{ 'imieNazwisko': { $regex:  request.query.imienazwisko, $options: 'i'} }  ] }}

  res.send(rss);
});

router.get("/findbyjson", async (req, res) => {
  console.log("nazwisko" + req.body.imieNazwisko);
  console.log(req.body.adres);

  if (req.body.imieNazwisko) req.body.imieNazwisko + " ";
  const findQuery = {
    nr: req.body.nr,
    rok: req.body.rok,
    imieNazwisko: new RegExp(req.body.imieNazwisko, "i"),
    adres: new RegExp(req.body.adres, "i"),
    nrDW: req.body.nrDW,
    rokDW: req.body.rokDW,
    sygnaturaNakaz: req.body.sygnaturaNakaz,
    sygnaturaSprzeciw: req.body.sygnaturaSprzeciw,
    sygnaturaApelacja: req.body.sygnaturaApelacja
  };

  rss = await Rss.find(findQuery);
  res.send(rss);
});

module.exports = router;

//,
//adres: new RegExp(req.body.adres, "i")
