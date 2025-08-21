const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const actualizarEmpleadoControlador = require('../controladores/actualizarEmpleado')

router.patch(
  '/:id',
  verificarSesion,
  [
    body('nombre')
      .optional()
      .notEmpty()
      .withMessage('El nombre no puede estar vacío'),
    body('correo')
      .optional()
      .isEmail()
      .withMessage('Correo inválido'),
    body('contrasena')
      .optional({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol')
      .optional()
      .notEmpty()
      .withMessage('Rol inválido'),
  ],
  actualizarEmpleadoControlador.patchEmpleado
)

module.exports = router
