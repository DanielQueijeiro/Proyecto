const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const crearAreaControlador = require('../controladores/crearArea')

router.post('/', verificarToken, crearAreaControlador.postArea)

module.exports = router