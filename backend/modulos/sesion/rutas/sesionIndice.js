const express = require('express')
const router = express.Router()

const iniciarSesionRuta = require('./iniciarSesion.ruta')

router.use('/login', iniciarSesionRuta)

module.exports = router