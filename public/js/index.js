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

socket.on('newLocationMessage', function(event) {
    var li = jQuery('<li></li>')
    var a = jQuery('<a target = "_blank">My Current location</a>')
    li.text(`${event.name}`)
    a.attr('href', event.url)

    li.append(a)
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

var locationBtn = jQuery('#send-location')

locationBtn.on('click', function() {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by Browser')
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        // console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,

        })
    }, function() {
        alert('Unable to fetch location')
    })
})