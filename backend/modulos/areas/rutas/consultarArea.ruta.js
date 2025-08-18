const express = require('express')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const consultarAreaControlador = require('../controladores/consultarArea')

router.get('/', verificarSesion, consultarAreaControlador.getAreas)
router.get('/:id', verificarSesion, consultarAreaControlador.getAreaById)

module.exports = router
