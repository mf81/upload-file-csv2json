module.exports = function(req, res, next) {
  const { role } = req.user;
  if (role !== "admin" || role !== "moderator" || role !== "ro")
    return res.status(403).send("Access denied");
  next();
};
