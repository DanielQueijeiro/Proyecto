const express = require('express')
const router = express.Router()

const crearAreaRuta = require('./crearArea.ruta')
const consultarAreasRuta = require('./consultarArea.ruta')
const eliminarAreaRuta = require('./eliminarArea.ruta')
const actualizarAreaRuta = require('./actualizarArea.ruta')

router.use('/crear', crearAreaRuta)
router.use('/consultar', consultarAreasRuta)
router.use('/eliminar', eliminarAreaRuta)
router.use('/actualizar', actualizarAreaRuta)

module.exports = router