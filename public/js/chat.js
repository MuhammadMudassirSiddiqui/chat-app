// const { updateLocale } = require("moment");

var socket = io();

// function scrollToBottom() {
//     // selectors
//     var messages = jQuery('#messages')
//     var newMessages = jQuery('#messages').children('li:last-child')

//     // heights
//     var clientHeight = messages.prop('clientHeight')
//     var scrollTop = messages.prop('scrollTop')
//     var scrollHeight = messages.prop('scrollHeight')
//     var newMessageHeight = newMessages.innerHeight()
//     var lastMessageHeight = newMessages.prev().innerHeight()

//     if (clientHeight + scrollTop >= scrollHeight) {
//         messages.scrollTop(scrollHeight)
//             // console.log('kis masla h');
//     }

// }

socket.on('connect', function() {
    // console.log('connected to server');
    var param = jQuery.deparam(window.location.search)

    socket.emit('join', param, function(err) {
        if (err) {
            window.location.href = '/'

            alert(err)

        } else {
            console.log('no err')
        }
    })

})

socket.on('disconnect', function() {
    console.log('server is dis connected');
})

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>')
    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user))
    })

    jQuery('#users').html(ol)

})



socket.on('message1', function(event) {
    var formattedTime = moment(event.createAt).format(' h:mm a')

    var template = jQuery('#message-template').html()
    var html = Mustache.render(template, {
        name: event.name,
        text: event.text,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html)

    // // console.log(event);
    // li = jQuery('<li></li>')
    // li.text(`${event.name} ${formattedTime} : ${event.text}`)

    // jQuery('#messages').append(li)

})

socket.on('newLocationMessage', function(event) {
    var formattedTime = moment(event.createdAt).format('h:mm a')
    var template = jQuery("#location-message-template").html()

    var html = Mustache.render(template, {
        name: event.name,
        createdAt: formattedTime,
        url: event.url
    })

    jQuery('#messages').append(html)
        // var formattedTime = moment(event.createdAt).format('h:mm a')
        // var li = jQuery('<li></li>')
        // var a = jQuery('<a target = "_blank">My Current location</a>')
        // li.text(`${event.name} ${formattedTime} :`)
        // a.attr('href', event.url)

    // li.append(a)
    // jQuery('#messages').append(li)
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
            // name: "User",
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