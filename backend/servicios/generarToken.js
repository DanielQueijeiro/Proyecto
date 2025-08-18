const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

function generarToken(usuario){
    return jwt.sign(
        { id: usuario._id, email: usuario.correo },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

module.exports = generarToken;