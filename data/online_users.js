const onusers = {}
const socket_ids = {}

exports = module.exports = {

    onuserarray:onusers,

    addOnUser(socketid, username){
        onusers[username] = {
            socketid,
            username
        }
    },

    getSocketIdByUsername(username){
        return onusers[username].socketid
    },

    removeOnUser(socketid, username){
        delete onusers[username]
    }

}