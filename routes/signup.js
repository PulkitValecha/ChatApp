const route = require('express').Router()
const path = require('path')
const users = require('../data/users')

route.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, '../public_static/signup.html'))
})

route.post('/',(req, res)=>{

    users.addUser(req.body.username, req.body.password)
    res.redirect('/login')

})


exports = module.exports  = {
    route
}