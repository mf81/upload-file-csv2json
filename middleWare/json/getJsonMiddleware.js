const fs = require("fs");
const config = require("config");

module.exports = (req, res, netx) => {
  fs.access(config.get("jsonFile"), fs.F_OK, err => {
    if (err) {
      return res.status(404).send("File does not exist...");
    }
    const readStream = fs.createReadStream(config.get("jsonFile"));
    readStream.pipe(res);
  });
  netx();
};
