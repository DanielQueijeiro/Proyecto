const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const eliminarEmpleadoControlador = require('../controladores/eliminarEmpleado')

router.delete('/:id', verificarToken, eliminarEmpleadoControlador.deleteEmpleado)

module.exports = router