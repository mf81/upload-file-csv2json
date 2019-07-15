const express = require("express");
const config = require("config");
const loggerWinston = require("./startup/winston");

const app = express();
app.use(express.json());

require("./startup/db")();
require("./startup/routers")(app);

const port = process.env.PORT || config.get("PORT") || 3000;
const server = app.listen(port, () => {
  loggerWinston().info(`Lisning on port: ${port}`);
});

module.exports = server;
