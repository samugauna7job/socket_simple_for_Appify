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
io.on('connection', async (socket) => {  // Convertimos el manejador en una función asíncrona
    console.log(`a user connected ${socket.id}`);
    const { superUserId } = socket.handshake.query;

    // Ahora podemos usar await para obtener el resultado de isValidSuperUser
    try {
        const isValid = await isValidSuperUser(superUserId);
        console.log(isValid);  // Ahora debería mostrar true o false

        if (isValid) {
            socket.join(superUserId);
            console.log(`Socket ${socket.id} joined room ${superUserId}`);

            socket.on('register', (data) => {
                console.log('message received from client to server:', data);
                io.to(superUserId).emit('update', { message: 'desde el server, datos de update', data });
            });
        } else {
            console.log(`SuperUserId no válido: ${superUserId}`);
            socket.disconnect();
        }
    } catch (error) {
        console.log(`Error al validar el superUserId: ${superUserId}`, error);
        socket.disconnect();
    }

    socket.on('disconnect', (reason) => {
        console.log(`Cliente ${socket.id} desconectado: ${reason}`);
        if (superUserId) {
            socket.leave(superUserId);
        }
    });
});


const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
