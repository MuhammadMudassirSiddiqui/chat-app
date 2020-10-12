var path = require('path')

var test = path.join(__dirname, '../public')

var express = require('express')

var app = express()
var port = process.env.PORT || 3000

app.use('/', express.static(test))

// app.get('/', (req, res) => {
//     res.send('hello')
// })

app.listen(port, () => {
    console.log(`you are listining on port ${port}`);
})