const config = require("config");
const Busboy = require("busboy");
const fs = require("fs");
const csv2json = require("csv2json");

module.exports = (req, res, next) => {
  if (req.method === "POST") {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      if (mimetype != "text/csv")
        return res.status(500).send("File is not CSV");

      const fileToSave = fs.createWriteStream(config.get("jsonFile"));
      file
        .pipe(
          csv2json({
            separator: ";"
          })
        )
        .pipe(fileToSave);
      // const fileToSave = fs.createWriteStream(config.get("csvFile"));
      // file.pipe(fileToSave);
    });
    req.pipe(busboy);
  }
  next();
};
