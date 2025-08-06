const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const crearEmpleadoControlador = require('../controladores/crearEmpleado')

router.post('/', verificarToken, crearEmpleadoControlador.postEmpleado)

module.exports = router