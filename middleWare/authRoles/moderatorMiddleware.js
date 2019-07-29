module.exports = (req, res, next) => {
  const { role } = req.user;

  if (role === "admin" || role === "moderator") {
    next();
  } else return res.status(403).send("Access denied");
};
