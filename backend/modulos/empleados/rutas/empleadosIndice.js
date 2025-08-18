const express = require('express')
const router = express.Router()

const consultarEmpleadosRuta = require('./consultarEmpleados.ruta')
const crearEmpleadoRuta = require('./crearEmpleado.ruta')
const eliminarEmpleadoRuta = require('./eliminarEmpleado.ruta')
const actualizarEmpleadoRuta = require('./actualizarEmpleado.ruta')
const consultarLibresRuta = require('./consultarLibres.ruta')

router.use('/consultar', consultarEmpleadosRuta)
router.use('/crear', crearEmpleadoRuta)
router.use('/eliminar', eliminarEmpleadoRuta)
router.use('/actualizar', actualizarEmpleadoRuta)
router.use('/libres', consultarLibresRuta)

module.exports = router