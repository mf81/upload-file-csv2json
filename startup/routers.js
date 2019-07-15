const importRoute = require("../routers/importRoute");
const error = require("../middleWare/errorMiddleware");

module.exports = app => {
  app.use("/api/csv", importRoute);
  app.use(error);
};
