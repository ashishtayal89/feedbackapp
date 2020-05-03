module.exports = (req, res, next) => {
  const { credits } = req.user;
  if (credits) {
    return next();
  }
  return res.status(403).send({ error: "You don't have enough credits" });
};
