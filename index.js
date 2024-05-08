import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {Server as SocketIoServer} from 'socket.io'
import http from 'http'
import isValidSuperUser from './dbBack/requestTo.js'

const app = express()
const server = http.createServer(app)

const io = new SocketIoServer(server, {
    cors: {
        origin: 'http://localhost:5173'
    },
    transports: ['websocket']
})
app.use(cors())
io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`)
    const { superUserId } = socket.handshake.query; // Asegúrate de enviar este dato desde el cliente
    if( isValidSuperUser(superUserId)){
        socket.join(superUserId);
        console.log(`Socket ${socket.id} joined room ${superUserId}`);
    }
    socket.on('register', (data) => {
        console.log('message received from client to server:', data);
        io.to(superUserId).emit('update', { message: 'desde el server, datos de update', data });
    });
    
    socket.on('disconnect', (reason) => {
        socket.leave(superUserId)
        console.log(`Cliente ${socket.id} desconectado: ${reason}`);
    });
})


const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
