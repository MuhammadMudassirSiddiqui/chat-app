var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
    socket.on('message1', function(event) {
        console.log(event);
    })
})

socket.on('disconnect', function() {
    console.log('server is dis connected');
})

socket.emit('message2', {
    name: 'mudassir',
    text: 'han bolo',
    createdAt: new Date().getTime()
})