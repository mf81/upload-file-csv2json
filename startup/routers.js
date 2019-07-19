const importRoute = require("../routers/importRoute");
const rssRoute = require("../routers/rssRoute");
const error = require("../middleWare/errorMiddleware");

module.exports = app => {
  app.use("/api/csv", importRoute);
  app.use("/api/rss", rssRoute);
  app.use(error);
};
