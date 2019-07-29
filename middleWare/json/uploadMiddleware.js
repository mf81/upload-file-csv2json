const config = require("config");
const Busboy = require("busboy");
const fs = require("fs");
const csv2json = require("csv2json");

module.exports = (req, res, next) => {
  if (req.method === "POST") {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      if (fieldname !== "csv" || mimetype !== "text/csv") {
        return res.status(500).json({ message: "File upload error." });
      }

      const fileToSave = fs.createWriteStream(config.get("jsonFile"));
      file
        .pipe(
          csv2json({
            separator: ";"
          })
        )
        .pipe(fileToSave);
    });

    busboy.on("finish", function() {
      res.status(200).json({ message: "File uploaded successfully." });
    });
    req.pipe(busboy);
  }
  next();
};
