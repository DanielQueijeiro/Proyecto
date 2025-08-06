const dotenv = require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || '8080'

const mongoose = require('mongoose');

const generarToken = require('./servicios/generarToken');
console.log(generarToken('usuarioPrueba'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a la base de datos de MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

const empresasRutas = require('./modulos/empresas/rutas/empresasIndice')
const empleadosRutas = require('./modulos/empleados/rutas/empleadosIndice.js')
const areasRutas = require('./modulos/areas/rutas/areasIndice')
const sesionRutas = require('./modulos/sesion/rutas/sesionIndice')

app.use('/empresas', empresasRutas)
app.use('/empleados', empleadosRutas)
app.use('/areas', areasRutas)
app.use('/sesion', sesionRutas)

app.use((req, res) =>{
    res.status(404).json({
        error: 'Ruta no encontrada',
    })
})

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`)
})  