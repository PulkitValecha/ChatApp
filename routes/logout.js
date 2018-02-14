const route = require('express').Router()
const path = require('path')
const users = require('../data/users')
const cp = require('../utils/cookieparser')

route.get('/', (req, res)=>{
    let loginCookie = cp.getCookie(req.header('Cookie'), 'login')
    users.removeToken(loginCookie)

    return res.sendFile(path.join(__dirname,'../public_static/login.html'))

})

exports = module.exports = {
    route
}
