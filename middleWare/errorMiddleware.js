const loggerWinston = require("../startup/winston");
const ev = require("express-validation");

module.exports = function(err, req, res, next) {
  loggerWinston().error(err.message);

  if (err instanceof ev.ValidationError)
    return res.status(500).send(`EV: ${err.message}`);

  res.status(500).send(`Something failed.: ${err.message}`);
  next();
};
