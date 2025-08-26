const express = require('express');
const multer = require('multer');
const { validarArchivoDesdeBuffer } = require('../controladores/validarCsv');

const router = express.Router();
const upload = multer( );

router.post('/sheet-file', upload.single('file'), validarArchivoDesdeBuffer)


module.exports = router;
