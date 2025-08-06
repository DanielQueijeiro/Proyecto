const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const consultarEmpleadosControlador = require('../controladores/consultarEmpleados')

router.get('/', verificarToken, consultarEmpleadosControlador.getEmpleados)
router.get('/:id', verificarToken, consultarEmpleadosControlador.getEmpleadoPorId)

module.exports = router