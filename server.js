const express = require('express')
const http = require('http')
const path =require('path')
const socketio = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketio(server)

app.use('/',express.static(path.join(__dirname, "/public_static")))

io.on('connection',(socket)=>{
    console.log(socket.id)
})

server.listen(2323,()=>{
    console.log("Go chatting on http://localhost:2323")
})