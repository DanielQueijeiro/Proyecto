const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const Empleado = require('../../../modelos/empleados/empleados.modelo')

exports.postEmpleado = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { nombre, correo, contrasena } = req.body

  const rondasHasheo = 12
  const contrasenaHasheada = await bcrypt.hash(contrasena, rondasHasheo)

  try {
    await Empleado.postEmpleado(nombre, correo, contrasenaHasheada)
    return res.status(201).json({
      message: 'Empleado creado exitosamente'
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'El correo ya está en uso'
      })
    }
    console.error('Error al crear el empleado:', error)
    return res.status(500).json({
      error: 'Error interno del servidor al crear el empleado'
    })
  }
}
