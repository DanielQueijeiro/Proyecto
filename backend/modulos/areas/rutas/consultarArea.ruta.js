const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const consultarAreaControlador = require('../controladores/consultarArea')

router.get('/', verificarToken, consultarAreaControlador.getAreas)
router.get('/:id', verificarToken, consultarAreaControlador.getAreaById)

module.exports = router