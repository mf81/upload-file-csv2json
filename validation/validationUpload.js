var Joi = require("joi");

module.exports = {
  headers: {
    "content-length": Joi.string()
      .invalid("0")
      .required()
  }
};
