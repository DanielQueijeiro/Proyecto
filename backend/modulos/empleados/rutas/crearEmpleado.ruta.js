const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const crearEmpleadoControlador = require('../controladores/crearEmpleado')

router.post(
  '/',
  verificarSesion,
  [
    body('nombre')
      .notEmpty()
      .withMessage('El nombre es obligatorio'),
    body('correo')
      .isEmail()
      .withMessage('Correo inválido'),
    body('contrasena')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol')
      .notEmpty()
      .withMessage('El rol es obligatorio')
  ],
  crearEmpleadoControlador.postEmpleado
)

module.exports = router
