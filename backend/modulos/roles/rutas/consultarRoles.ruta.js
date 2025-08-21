const express = require('express')
const router = express.Router()

const consultarRoles = require('../controladores/consultarRoles')
const verificarSesion = require('../../../servicios/verificarSesion')

router.get('/',  consultarRoles)

module.exports = router