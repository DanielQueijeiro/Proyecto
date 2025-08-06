const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const eliminarAreaControlador = require('../controladores/eliminarArea')

router.delete('/:id', verificarToken, eliminarAreaControlador.deleteArea)

module.exports = router