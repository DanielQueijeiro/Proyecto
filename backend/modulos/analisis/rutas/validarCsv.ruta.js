const express = require('express');
const router = express.Router();
const { validarCsv } = require('../controladores/validarCsv');

router.post('/', validarCsv);

module.exports = router;