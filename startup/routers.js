const importRoute = require("../routers/importRoute");
const rssRoute = require("../routers/rssRoute");
const userRoute = require("../routers/userRoute");
const error = require("../middleWare/errorMiddleware");
const authRoute = require("../routers/authRoute");

module.exports = app => {
  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/csv", importRoute);
  app.use("/api/rss", rssRoute);
  app.use(error);
};
