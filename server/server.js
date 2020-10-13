var path = require('path')

var test = path.join(__dirname, '../public')
var http = require('http')
var express = require('express')
const socketIO = require('socket.io')
const { Socket } = require('dgram')


var app = express()
var port = process.env.PORT || 3000
var server = http.createServer(app)
var io = socketIO(server)

app.use('/', express.static(test))

io.on('connection', (socket) => {
    console.log('new user connected');


    socket.on('message2', (event) => {
        console.log(event);
        io.emit('message1', {
            name: event.name,
            text: event.text,
            createdAt: new Date().getTime()
        })
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