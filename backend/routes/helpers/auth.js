const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== 'mysecrettoken') return res.sendStatus(403);
  next();
};

export default authenticateToken;
