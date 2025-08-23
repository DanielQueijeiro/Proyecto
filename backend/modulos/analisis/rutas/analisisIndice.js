const express = require('express');
const router = express.Router();

const validarCsvRuta = require('./validarCsv.ruta');

router.use('/validar', validarCsvRuta);

module.exports = router;