const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const consultarEmpresasControlador = require('../controladores/consultarEmpresas')

router.get('/', verificarToken, consultarEmpresasControlador.getEmpresas)
router.get('/:id', verificarToken, consultarEmpresasControlador.getEmpresasById)

module.exports = router