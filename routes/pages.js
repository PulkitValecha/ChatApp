const route = require('express').Router()
const path = require('path')
const users = require('../data/users')
const cp = require('../utils/cookieparser')

route.get('/',(req, res)=>{

    ///total users connected to socket io server
    res.sendFile(path.join(__dirname, '../public_static/socket_count.html'));


})


route.get('/chatapp',(req, res)=>{
    /// have to check if user is logged in
    if(req.user){
        return res.sendFile(path.join(__dirname, '../public_static/chatapp.html'))
    }
    res.send("Not authorized")

})


exports = module.exports = {
    route
}