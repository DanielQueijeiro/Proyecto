const express = require('express')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const actualizarAreaControlador = require('../controladores/actualizarArea')

router.patch('/:id', verificarSesion, actualizarAreaControlador.patchArea) 

module.exports = router
