const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const actualizarEmpresaControlador = require('../controladores/actualizarEmpresa')

router.patch('/:id', verificarToken, actualizarEmpresaControlador.patchEmpresa)

module.exports = router