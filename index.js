const express = require('express')
const http = require('http')
const path =require('path')
const socketio = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketio(server)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname,'public_static')))

app.use('/',require('./routes/pages').route)

io.on('connection',(socket)=>{
    console.log("User with socket id : " + socket.id + " connected" )
    socket.broadcast.emit('add_user',socket.id)

    socket.on('msg',function(data){
        io.emit('msg',data)
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })

    socket.on('disconnect',()=>{
        console.log("User with socket id : " + socket.id + " disconnected" )
    })
})

server.listen(2323,()=>{
    console.log("Go chatting on http://localhost:2323")
})