module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(403).send({ error: 'You must be logged in!' });
  }
  next();
};
