var socket = io().connect('http://localhost:2323')

$(function(){

    var output = $('#output'),
        handle = $('#handle'),
        message = $('#message'),
        sendBtn = $('#send')

    sendBtn.click(function(){
        if(message.val()!="") {
            socket.emit('msg', {
                sender: handle.val(),
                message: message.val()
            })
            message.val('')
        }
    })

    socket.on('msg',function(data){
        output.append(`<p><strong>${data.sender} :</strong> ${data.message}</p>`)
    })

})