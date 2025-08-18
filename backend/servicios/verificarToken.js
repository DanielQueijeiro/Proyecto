const {verify} = require('jsonwebtoken')
const listaNegra = new Set()

function verificarToken(req, res, next) {
    let token = req.headers.authorization;

    
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado o inválido' });
    }
    
    token = token.replace('Bearer ', '');
    
    if (listaNegra.has(token)) {
        return res.status(404).json({ error: 'Ruta no encontrada' });
    }
    
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(404).json({ error: 'Ruta no encontrada' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = verificarToken;