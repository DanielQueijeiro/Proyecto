const express = require('express')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const consultarEmpresasControlador = require('../controladores/consultarEmpresas')

router.get('/', verificarSesion, consultarEmpresasControlador.getEmpresas)
router.get('/:id', verificarSesion, consultarEmpresasControlador.getEmpresasById)

module.exports = router
