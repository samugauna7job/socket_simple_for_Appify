import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {Server as SocketIoServer} from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)

const io = new SocketIoServer(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})
app.use(cors())
io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`)
    socket.on('message', (data) => {
        console.log(`Mensaje recibido del cliente ${socket.id}:`, data);
        // Puedes responder al cliente si lo deseas
        // socket.emit('respuesta', 'Mensaje recibido en el servidor');
    });
    socket.on('disconnect', () => {
        console.log(`user disconnected ${socket.id}`)
    })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
