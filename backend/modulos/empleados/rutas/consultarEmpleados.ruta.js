const express = require('express')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const consultarEmpleadosControlador = require('../controladores/consultarEmpleados')

router.get('/', verificarSesion, consultarEmpleadosControlador.getEmpleados)
router.get('/:id', verificarSesion, consultarEmpleadosControlador.getEmpleadoPorId)

module.exports = router
