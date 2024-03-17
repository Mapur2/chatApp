const express = require('express');

const app= express()

app.use(express.static('./public'))




const server=app.listen(4000,()=>{
    console.log("http://localhost:4000/index.html")
})

const io=require('socket.io')(server)

let socketsConnected = new Set()

io.on('connection',onConnected)

function onConnected(socket){
   // console.log(socket.id)
    socketsConnected.add(socket.id)

    io.emit('clients-total',socketsConnected.size)
    
    socket.on('message',(data)=>{
        //console.log(data)
        socket.broadcast.emit('chat-message',data)
    })

    socket.on('feedback',(data)=>{
        socket.broadcast.emit('typing',data)
    })

    socket.on('disconnect',()=>{
        //console.log("Disconnected", socket.id)
        socketsConnected.delete(socket.id)
    })
}