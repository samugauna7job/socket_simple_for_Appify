
const socketClient = io()

socketClient.emit('message', {data:"hola como va"})
socketClient.on('connect', (socket)=>{
    socket.on('message1', {data: "hola como va 2"})
})

