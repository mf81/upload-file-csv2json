const Joi = require("joi");
const mongoose = require("mongoose");

const rssSchema = new mongoose.Schema({
  nr: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 10
  },
  rok: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 30
  },
  kodLokalu: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  nrDW: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 10
  },
  rokDW: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 30
  },
  polaczono: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  rodzaj: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  imieNazwisko: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  adres: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  ADM: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  wartosc: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  okresDochodzony: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  wniesieniePozwu: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  sygnaturaNakaz: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  orzeczenieNakaz: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  sygnaturaSprzeciw: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  orzeczenieSprzeciw: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  sygnaturaApelacja: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  orzeczenieApelacja: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  wystapienieOklauzule: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  wniosekMajatku: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  sygnAktWyjawienia: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  orzeczenieWyjawienia: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  etapPostEgz: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  uwagi: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 500
  },
  przekazanoDoDP: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  radcaPrawny: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  },
  rozliczoneZastepstwa: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 100
  }
});

function validate(value) {
  const schema = {
    nr: Joi.string()
      .min(1)
      .max(10)
      .required(),
    rok: Joi.string()
      .min(1)
      .max(30)
      .required(),
    kodLokalu: Joi.string()
      .min(1)
      .max(10)
      .required(),
    nrDW: Joi.string()
      .min(1)
      .max(10),
    rokDW: Joi.string()
      .min(1)
      .max(30),
    polaczono: Joi.string()
      .min(1)
      .max(100),
    rodzaj: Joi.string()
      .min(1)
      .max(100)
      .required(),
    imieNazwisko: Joi.string()
      .min(1)
      .max(100)
      .required(),
    adres: Joi.string()
      .min(1)
      .max(100)
      .required(),
    ADM: Joi.string()
      .min(1)
      .max(10),
    wartosc: Joi.string()
      .min(1)
      .max(100),
    okresDochodzony: Joi.string()
      .min(1)
      .max(100),
    wniesieniePozwu: Joi.string()
      .min(1)
      .max(100),
    sygnaturaNakaz: Joi.string()
      .min(1)
      .max(100),
    orzeczenieNakaz: Joi.string()
      .min(1)
      .max(100),
    sygnaturaSprzeciw: Joi.string()
      .min(1)
      .max(100),
    orzeczenieSprzeciw: Joi.string()
      .min(1)
      .max(100),
    sygnaturaApelacja: Joi.string()
      .min(1)
      .max(100),
    orzeczenieApelacja: Joi.string()
      .min(1)
      .max(100),
    wystapienieOklauzule: Joi.string()
      .min(1)
      .max(100),
    wniosekMajatku: Joi.string()
      .min(1)
      .max(100),
    sygnAktWyjawienia: Joi.string()
      .min(1)
      .max(100),
    orzeczenieWyjawienia: Joi.string()
      .min(1)
      .max(100),
    etapPostWgz: Joi.string()
      .min(1)
      .max(100),
    uwagi: Joi.string()
      .min(1)
      .max(100),
    przekazanoDoDP: Joi.string()
      .min(1)
      .max(100),
    radcaPrawny: Joi.string()
      .min(1)
      .max(100),
    rozliczoneZastepstwa: Joi.string()
      .min(1)
      .max(10)
  };
  return Joi.validate(value, schema);
}

const Rss = mongoose.model("Rss", rssSchema);

exports.Rss = Rss;
exports.rssSchema = rssSchema;
exports.validateRss = validate;
