const express = require('express')
const router = express.Router()

const iniciarSesionRuta = require('./iniciarSesion.ruta')
const googleRuta = require('./google.ruta')
const cerrarSesionRuta = require('./cerrarSesion.ruta')
const estadoSesionRuta = require('./estadoSesion.ruta')

router.use('/login', iniciarSesionRuta)
router.use('/google', googleRuta)
router.use('/logout', cerrarSesionRuta)
router.use('/estado', estadoSesionRuta)

module.exports = router
