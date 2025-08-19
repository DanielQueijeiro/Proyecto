exports.googleCallback = (req, res) => {
  req.session.user = { 
    id: req.user._id, 
    nombre: req.user.nombre,
    email: req.user.correo,
    permisos: req.user.permisos || []  
  }
  const redirectURL = `http://localhost:5173/login?id=${req.user._id}&nombre=${encodeURIComponent(req.user.nombre)}`;
  res.redirect(redirectURL);
};
