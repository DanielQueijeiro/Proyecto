const express = require('express')
const { body } = require('express-validator')
const router = express.Router()

const verificarSesion = require('../../../servicios/verificarSesion')
const actualizarEmpresaControlador = require('../controladores/actualizarEmpresa')

router.patch(
    '/:id', 
    verificarSesion, 
    [
        body('nombre')
        .notEmpty()
        .withMessage('El nombre no puede estar vacío'),
        body('direccion')
        .notEmpty()
        .withMessage('La dirección no puede estar vacía'),
        body('telefono')
        .notEmpty()
        .isMobilePhone('any')
        .withMessage('El teléfono no es válido')
    ],
    actualizarEmpresaControlador.patchEmpresa)

module.exports = router
