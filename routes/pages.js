const route = require('express').Router()
const path = require('path')

route.get('/',(req, res)=>{

    ///total users connected to socket io server
    res.sendFile(path.join(__dirname, '../public_static/index.html'));
})


route.get('/chatapp',(req, res)=>{
    /// have to check if user is logged in

    res.sendFile(path.join(__dirname, '../public_static/cahtapp.html'))
})


exports = module.exports = {
    route
}