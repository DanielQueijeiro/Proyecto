const Empleado = require('../../../modelos/empleados/empleados.modelo');
const generarToken = require('../../../servicios/generarToken');
const bcrypt = require('bcrypt');

exports.postIniciarSesion = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        if (!correo || !contrasena) {
            return res.status(400).json({
                error: 'Email y contraseña son obligatorios',
            });
        }
        const empleado = await Empleado.getEmpleadoByEmail(correo);
        if (!empleado) {
            return res.status(404).json({
                error: 'Empleado no encontrado',
            });
        }
        const contrasenaValida = await bcrypt.compare(contrasena, empleado.contrasena);
        if (!contrasenaValida) {
            return res.status(401).json({
                error: 'Credenciales inválidas',
            });
        }
        const token = generarToken(empleado._id);
        res.json({ token, user: empleado.nombre });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
