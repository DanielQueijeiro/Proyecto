const express = require('express')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const crearAreaControlador = require('../controladores/crearArea')

router.post('/', verificarSesion, crearAreaControlador.postArea)

module.exports = router
