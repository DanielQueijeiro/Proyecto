const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const actualizarAreaControlador = require('../controladores/actualizarArea')

router.patch('/:id', verificarToken, actualizarAreaControlador.patchArea) 

module.exports = router