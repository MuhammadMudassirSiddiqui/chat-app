var path = require('path')

var test = path.join(__dirname, '../public')
var http = require('http')
var express = require('express')
const socketIO = require('socket.io')
const { Socket } = require('dgram')
var { genMessage, genLocationMessage } = require('./utils/message')


var app = express()
var port = process.env.PORT || 3000
var server = http.createServer(app)
var io = socketIO(server)
var { isRealString } = require('./utils/validation')

app.use('/', express.static(test))

io.on('connection', (socket) => {
    console.log('new user connected');

    // socket.emit('message1', genMessage('Admin', 'Welcome to chat app'))

    // socket.broadcast.emit('message1', genMessage('Admin', 'new User login'))

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('name and room name is required')
        }
        socket.join(params.room)
            // socket.broadcast --> socket.broadcast.to('<any specific name here room name>').emit(..)
            // io.emit --> io.to('<any specific name here room name>').emit(...)
            //socket.emit-->(it remains same bcz it communicate to single user)

        socket.emit('message1', genMessage('Admin', `${params.name} Welcome To Chat-App`))
        socket.broadcast.to(params.room).emit('message1', genMessage('Admin', `${params.name} has join`))


        callback()
    })

    socket.on('message2', (event, callback) => {
        // console.log(event);
        io.emit('message1', genMessage(event.name, event.text));
        callback()
    })
    socket.on('createLocationMessage', (event) => {
        io.emit('newLocationMessage', genLocationMessage('User', event.latitude, event.longitude))
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

// app.get('/', (req, res) => {
//     res.send('hello')
// })

server.listen(port, () => {
    console.log(`you are listining on port ${port}`);
})