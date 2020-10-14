var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

})

socket.on('disconnect', function() {
    console.log('server is dis connected');
})

socket.on('message1', function(event) {
    console.log(event);
    li = jQuery('<li></li>')
    li.text(`${event.name} : ${event.text}`)

    jQuery('#messages').append(li)

})

// socket.emit('message2', {
//     name: 'Usna',
//     text: 'is it works'
// }, function(data) {
//     console.log('recive', data);
// })

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault()

    socket.emit('message2', {
            name: "User",
            text: jQuery('[name=message]').val()
        }),
        function() {

        }
})