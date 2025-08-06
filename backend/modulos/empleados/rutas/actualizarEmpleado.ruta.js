const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const actualizarEmpleadoControlador = require('../controladores/actualizarEmpleado')

router.patch('/:id', verificarToken, actualizarEmpleadoControlador.patchEmpleado)

module.exports = router