module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    res.status(401).send({ error: 'Insufficient Credits' });
  }
  next();
};
