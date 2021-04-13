require('./config/config')
const express = require('express')
const morgan = require('morgan');
const app = express()
const cors = require('cors');
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const { socketController } = require('./sockets/socketController');

//sockets
io.on('connection', socketController)

// rutas

//Middleare propios
app.use(morgan('dev')); //muestra la ruta en la consola
app.use(cors())
app.use(express.urlencoded({extended:true})) //recibe datos, archivos, etc
app.use(express.json()) //recibir datos json

// agregar carpeta publica
app.use(express.static('public'))

//rutas

// base de datos

//arrancar server
server.listen(process.env.PORT, () => {
    console.log(`Conectado en puerto ${process.env.PORT}`);
})