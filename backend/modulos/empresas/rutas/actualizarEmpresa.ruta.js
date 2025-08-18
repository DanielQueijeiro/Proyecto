const express = require('express')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const actualizarEmpresaControlador = require('../controladores/actualizarEmpresa')

router.patch('/:id', verificarSesion, actualizarEmpresaControlador.patchEmpresa)

module.exports = router
