const express = require('express');
const router = express.Router();
const { getEmpleadosLibres } = require('../controladores/consultarLibres');

router.get('/', getEmpleadosLibres);

module.exports = router;
