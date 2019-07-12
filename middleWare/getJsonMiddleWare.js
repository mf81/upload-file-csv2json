const fs = require("fs");
const config = require("config");

module.exports = (req, res, netx) => {
  const readStream = fs.createReadStream(config.get("jsonFile"));
  readStream.pipe(res);
  netx();
};
