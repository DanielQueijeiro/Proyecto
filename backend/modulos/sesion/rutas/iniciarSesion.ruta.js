const express = require('express')
const router = express.Router()

const iniciarSesionControlador = require('../controladores/iniciarSesion')

router.post('/', iniciarSesionControlador.postIniciarSesion)

module.exports = router
