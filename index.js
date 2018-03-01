const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const path =require('path')
const bodyParser = require('body-parser')
const cp = require('./utils/cookieparser')
const users = require('./data/users')
const onusers = require('./data/online_users')

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

    const login_cookie = (cp.getCookie(socket.request.headers.cookie,'login'))
    const user = users.getUserWithToken(login_cookie)
    console.log(user)

    onusers.addOnUser(socket.id,user.username)


    io.emit('refreshOnlineUsers',onusers.onuserarray)

    socket.on('msg',function(data){
        if(data.toid == 0){
            console.log("Sent to all")
            io.emit('msg',data)
        }
        else{
            console.log("Sent to one")
            io.to(onusers.getSocketIdByUsername(data.toid)).to(socket.id).emit('msg',data)
        }

    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })

    socket.on('disconnect',()=>{
        onusers.removeOnUser(socket.id,user.username)
        console.log("User with socket id : " + socket.id + " disconnected" )
    })
})

server.listen(2323,()=>{
    console.log("Go chatting on http://localhost:2323")
})