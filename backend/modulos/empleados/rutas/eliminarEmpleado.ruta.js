const express = require('express')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const eliminarEmpleadoControlador = require('../controladores/eliminarEmpleado')

router.delete('/:id', verificarSesion, eliminarEmpleadoControlador.deleteEmpleado)

module.exports = router
