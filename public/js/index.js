var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

})

socket.on('disconnect', function() {
    console.log('server is dis connected');
})

socket.on('message1', function(event) {
    console.log(event);
})