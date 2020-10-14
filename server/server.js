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

app.use('/', express.static(test))

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('message1', genMessage('Admin', 'Welcome to chat app'))

    socket.broadcast.emit('message1', genMessage('Admin', 'new User login'))

    socket.on('message2', (event, callback) => {
        console.log(event);
        io.emit('message1', genMessage(event.name, event.text));
        // callback('this message is from server')
    })
    socket.on('createLocationMessage', (event) => {
        io.emit('newLocationMessage', genLocationMessage('Admin', event.latitude, event.longitude))
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