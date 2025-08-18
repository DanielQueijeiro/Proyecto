const express = require('express')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const eliminarAreaControlador = require('../controladores/eliminarArea')

router.delete('/:id', verificarSesion, eliminarAreaControlador.deleteArea)

module.exports = router
