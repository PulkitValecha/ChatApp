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
    if(user.username == req.body.username && user.password==req.body.password){
        let newToken = users.createToken(user.username)

        res.header('Set-Cookie', `login = ${newToken}`)
        return res.redirect('/chatapp')
    }

    else{
        return res.redirect('/login')
    }


})

exports = module.exports = {
    route
}