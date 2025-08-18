const express = require('express')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const eliminarEmpresaControlador = require('../controladores/eliminarEmpresa')

router.delete('/:id', verificarSesion, eliminarEmpresaControlador.deleteEmpresa)

module.exports = router
