const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const crearEmpresaControlador = require('../controladores/crearEmpresa')

router.post('/', verificarToken, crearEmpresaControlador.postEmpresa)

module.exports = router