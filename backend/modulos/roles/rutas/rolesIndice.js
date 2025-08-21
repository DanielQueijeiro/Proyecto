const express = require('express')
const router = express.Router()

const consultarRolesRuta = require('./consultarRoles.ruta')

router.use('/consultar', consultarRolesRuta)

module.exports = router