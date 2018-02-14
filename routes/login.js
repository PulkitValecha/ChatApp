const route = require('express').Router()
const path = require('path')
const users = require('../data/users')

route.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, '../public_static/login.html'))
})

route.post('/',(req, res)=>{

    let user = users.getUser(req.body.username)
    if(!user){
       return res.redirect('/login')
    }
    let newToken = users.createToken(user.username)

    res.header('Set-Cookie', `login = ${newToken}`)
    res.redirect('/chatapp')


})

exports = module.exports = {
    route
}