var moment = require('moment')

var createdAt = new Date().getTime()

var date = new moment(createdAt)

// date.add(1, 'd')
// console.log(date.format('MMM,Do YYYY , hh:mm:ss,A'));

console.log(date.format('h:mm a'));