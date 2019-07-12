const express = require("express");
const validate = require("express-validation");
const upload = require("./validation/validationUpload");
const push = require("./middleWare/uploadMiddleware");
const getJson = require("./middleWare/getJsonMiddleWare");

const app = express();
app.use(express.json());

app.get("/api/csv/get", getJson, (req, res) => {});

app.post("/api/csv/upload", [validate(upload), push], (req, res) => {
  res.send("File saved...");
});

//TODO
app.get("/api/csv/db", async (req, res) => {
  res.send("Sucessfull DB updated...");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Lisning on: ${port}`);
});

module.exports = server;
