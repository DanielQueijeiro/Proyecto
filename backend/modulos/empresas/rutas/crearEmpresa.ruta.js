const express = require('express')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const crearEmpresaControlador = require('../controladores/crearEmpresa')

router.post('/', verificarSesion, crearEmpresaControlador.postEmpresa)

module.exports = router
