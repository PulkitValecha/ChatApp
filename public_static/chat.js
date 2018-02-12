var socket = io().connect('http://localhost:2323')

$(function(){

    var output = $('#output'),
        handle = $('#handle'),
        message = $('#message'),
        sendBtn = $('#send'),
        feedbackBox = $('#feedback')

    sendBtn.click(function(){
        if(message.val()!="") {
            socket.emit('msg', {
                sender: handle.val(),
                message: message.val()
            })
            message.val('')
        }
    })

    message.keypress(function(){
        socket.emit('typing',{
            sender: handle.val()
        })
    })

    ///Event listners

    socket.on('typing',function(data){
        feedbackBox.empty().append(`<p><em>${data.sender} + " os typing a message..."</em></p>`)
        setTimeout(function(){
            feedbackBox.empty()
        },2500)
    })

    socket.on('msg',function(data){
        feedbackBox.empty()
        output.append(`<p><strong>${data.sender} :</strong> ${data.message}</p>`)
    })

})