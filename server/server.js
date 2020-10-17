var path = require('path')

var test = path.join(__dirname, '../public')
var http = require('http')
var express = require('express')
const socketIO = require('socket.io')
const { Socket } = require('dgram')
var { genMessage, genLocationMessage } = require('./utils/message')
var { Users } = require('./utils/user')


var app = express()
var port = process.env.PORT || 3000
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()
var { isRealString } = require('./utils/validation')

app.use('/', express.static(test))

io.on('connection', (socket) => {
    console.log('new user connected');

    // socket.emit('message1', genMessage('Admin', 'Welcome to chat app'))

    // socket.broadcast.emit('message1', genMessage('Admin', 'new User login'))

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('name and room name is required')
        }
        socket.join(params.room)

        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)


        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
            // socket.broadcast --> socket.broadcast.to('<any specific name here room name>').emit(..)
            // io.emit --> io.to('<any specific name here room name>').emit(...)
            //socket.emit-->(it remains same bcz it communicate to single user)

        socket.emit('message1', genMessage('Admin', `${params.name}, Welcome To Chat-App`))
        socket.broadcast.to(params.room).emit('message1', genMessage('Admin', `${params.name} has join`))


        callback()
    })

    socket.on('message2', (event, callback) => {
        // console.log(event);
        var user = users.getUser(socket.id)
        if (user && isRealString(event.text)) {
            io.to(user.room).emit('message1', genMessage(user.name, event.text));
        }
        callback()
    })
    socket.on('createLocationMessage', (event) => {
        var user = users.getUser(socket.id)
        if (user) {
            io.to(user.room).emit('newLocationMessage', genLocationMessage(user.name, event.latitude, event.longitude))
        }
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('message1', genMessage('Admin', `${user.name} has left`))
        }
        console.log('user disconnected');
    })
})

// app.get('/', (req, res) => {
//     res.send('hello')
// })

server.listen(port, () => {
    console.log(`you are listining on port ${port}`);
})