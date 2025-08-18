const express = require('express')
const router = express.Router()

const consultarEmpresasRuta = require('./consultarEmpresas.ruta')
const crearEmpresaRuta = require('./crearEmpresa.ruta')
const eliminarEmpresaRuta = require('./eliminarEmpresa.ruta')
const actualizarEmpresaRuta = require('./actualizarEmpresa.ruta')

router.use('/consultar', consultarEmpresasRuta)
router.use('/crear', crearEmpresaRuta)
router.use('/eliminar', eliminarEmpresaRuta)
router.use('/actualizar', actualizarEmpresaRuta)

module.exports = router