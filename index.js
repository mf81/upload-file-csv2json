const express = require("express");
const config = require("config");
const loggerWinston = require("./startup/winston");
require("express-async-errors");
const Joi = require("joi");
//Joi.objectId = require("joi-objectid")(Joi);

const app = express();
app.use(express.json());

require("./startup/jwt")();
require("./startup/db")();
require("./startup/routers")(app);
require("./startup/production")(app);

const port = process.env.PORT || config.get("PORT") || 3000;
const server = app.listen(port, () => {
  loggerWinston().info(`Lisning on port: ${port}`);
});

module.exports = server;
