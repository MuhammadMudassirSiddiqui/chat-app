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

    var messageTextBox = jQuery('[name=message]')

    socket.emit('message2', {
            name: "User",
            text: messageTextBox.val()
        },
        function() {
            messageTextBox.val('')
        })
})

var locationBtn = jQuery('#send-location')

locationBtn.on('click', function() {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by Browser')
    }

    locationBtn.attr('disabled', 'disabled').text('Sending Location....')
    navigator.geolocation.getCurrentPosition(function(position) {
        // console.log(position);
        locationBtn.removeAttr('disabled').text('Send Location')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,

        })

    }, function() {
        locationBtn.removeAttr('disabled').text('Send Location')
        alert('Unable to fetch location')
    })
})