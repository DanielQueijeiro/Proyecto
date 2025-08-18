const verificarSesion = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ error: 'No autenticado' });
};

module.exports = verificarSesion;
