const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const Empleado = require('../../../modelos/empleados/empleados.modelo')

exports.patchEmpleado = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { id } = req.params
    const { nombre, correo, contrasena, rol } = req.body

    const datosActualizados = {}
    if (nombre) datosActualizados.nombre = nombre
    if (correo) datosActualizados.correo = correo
    if (contrasena) {
      const rondasHasheo = 12
      datosActualizados.contrasena = await bcrypt.hash(contrasena, rondasHasheo)
    }
    if (rol) datosActualizados.rol = rol

    await Empleado.patchEmpleado(id, datosActualizados)
    return res.status(200).json({
      message: 'Empleado actualizado con éxito'
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'El correo ya está en uso'
      })
    }
    console.error('Error al actualizar el empleado:', error)
    return res.status(500).json({
      error: 'Error interno del servidor al actualizar el empleado'
    })
  }
}
