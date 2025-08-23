const dotenv = require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const path = require('path')
const http = require('http')
const socket = require('./servicios/socket')
const app = express()
const helmet = require("helmet")
const port = process.env.PORT || '8080'
const host = process.env.HOST || '0.0.0.0'
const passport = require('./servicios/passport')
const mongoose = require('mongoose');

app.use(helmet({
  crossOriginResourcePolicy: false,})
);

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
    limit: '5mb'
  })
);
app.use(bodyParser.json({
  limit: '5mb'
}));
const corsConfig = {
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};
app.use(cors(corsConfig));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(passport.initialize());

const empresasRutas = require('./modulos/empresas/rutas/empresasIndice')
const empleadosRutas = require('./modulos/empleados/rutas/empleadosIndice.js')
const areasRutas = require('./modulos/areas/rutas/areasIndice')
const sesionRutas = require('./modulos/sesion/rutas/sesionIndice')
const analisisRutas = require('./modulos/analisis/rutas/analisisIndice')

app.use('/empresas', empresasRutas)
app.use('/empleados', empleadosRutas)
app.use('/areas', areasRutas)
app.use('/sesion', sesionRutas)
app.use('/analisis', analisisRutas)

app.use((req, res) =>{
    res.status(404).json({
        error: 'Ruta no encontrada',
    })
})

const server = http.createServer(app)
socket.init(server)

server.listen(port, host, () => {
  console.log(`Aplicación escuchando en el puerto ${port} y en la dirección ${host}`)
})
