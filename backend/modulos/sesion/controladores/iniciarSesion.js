const Empleado = require('../../../modelos/empleados/empleados.modelo')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.postIniciarSesion = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { correo, contrasena } = req.body
    const empleado = await Empleado.getEmpleadoByEmail(correo)
    if (!empleado) {
      return res.status(404).json({
        error: 'Empleado no encontrado'
      })
    }
    const contrasenaValida = await bcrypt.compare(contrasena, empleado.contrasena)
    if (!contrasenaValida) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      })
    }
    req.session.user = { 
      id: empleado._id, 
      nombre: empleado.nombre,
      email: empleado.correo,
      permisos: empleado.permisos || []  
    }
    res.json({ user: { id: empleado._id, nombre: empleado.nombre } })
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

