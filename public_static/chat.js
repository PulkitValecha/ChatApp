var socket = io().connect('http://localhost:2323')

$(function(){

    var output = $('#output'),
        handle = $('#handle'),
        message = $('#message'),
        sendBtn = $('#send'),
        feedbackBox = $('#feedback'),
        userlist = $('#active_users'),
        to_user = $('#other_user')

    sendBtn.click(function(){
        if(message.val()!="") {
            if(to_user.val()==""){
                socket.emit('msg', {
                    sender: handle.val(),
                    message: message.val(),
                    toid: 0
                })
                message.val('')
            }

            else{
                socket.emit('msg', {
                    sender: handle.val(),
                    message: message.val(),
                    toid: to_user.val()
                })
                message.val('')
            }

        }
    })

    message.keypress(function(){
        socket.emit('typing',{
            sender: handle.val()
        })
    })

    ///Event listners

    socket.on('typing',function(data){
        feedbackBox.empty().append(`<p><em>${data.sender} is typing a message...</em></p>`)
        setTimeout(function(){
            feedbackBox.empty()
        },2500)
    })

    socket.on('refreshOnlineUsers',function(data){
        userlist.empty()
        Object.values(data).forEach((user)=>{
            userlist.append(`<p><em>${user.username}</em></p>`)
        })
    })

    socket.on('msg',function(data){
        feedbackBox.empty()
        output.append(`<p><strong>${data.sender} :</strong> ${data.message}</p>`)
    })

})