const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path =require('path')
const bodyParser = require('body-parser')
const cp = require('./utils/cookieparser')
const users = require('./data/users')

const app = express()
const server = http.Server(app)
const io = socketio(server)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname,'public_static')))

app.use((req, res, next)=>{
    let loginCookie
    if(req.header('Cookie')){
        loginCookie = cp.getCookie(req.header('Cookie'),'login')
    }

    let user = users.getUserWithToken(loginCookie)

    req.user = user
    next()

})

app.use('/',require('./routes/pages').route)
app.use('/login',require('./routes/login').route)
app.use('/signup',require('./routes/signup').route)
app.use('/logout',require('./routes/logout').route)

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