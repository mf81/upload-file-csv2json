const express = require("express");
const validate = require("express-validation");
const upload = require("./validation/validationUpload");
const push = require("./middleWare/uploadMiddleware");
const get = require("./middleWare/getJsonMiddleWare");
const config = require("config");
const loggerWinston = require("./startup/winston");

const app = express();
app.use(express.json());

require("./startup/db")();

app.get("/api/csv/get", get, (req, res) => {});

app.post("/api/csv/upload", [validate(upload), push], (req, res) => {
  res.send("File saved...");
});

//TODO
app.get("/api/csv/db", async (req, res) => {
  res.send("Sucessfull DB updated...");
});

const PORT = config.get("PORT");

const port = process.env.PORT || PORT || 3000;
const server = app.listen(port, () => {
  loggerWinston().info(`Lisning on port: ${port}`);
});

module.exports = server;
