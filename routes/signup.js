const route = require('express').Router()
const path = require('path')

route.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, '../public_static/signup.html'))
})

route.post('/',(req, res)=>{

})


exports = exports.module  = {
    route
}