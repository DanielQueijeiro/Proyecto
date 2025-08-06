const express = require('express')
const router = express.Router()

const verificarToken = require('../../../servicios/verificarToken')
const eliminarEmpresaControlador = require('../controladores/eliminarEmpresa')

router.delete('/:id', verificarToken, eliminarEmpresaControlador.deleteEmpresa)

module.exports = router