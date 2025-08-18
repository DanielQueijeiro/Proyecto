const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const iniciarSesionControlador = require('../controladores/iniciarSesion')

router.post(
  '/',
  [
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contrasena').notEmpty().withMessage('Contraseña requerida')
  ],
  iniciarSesionControlador.postIniciarSesion
)

module.exports = router

