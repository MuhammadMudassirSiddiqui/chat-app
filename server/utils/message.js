var moment = require('moment')

var genMessage = function(name, text) {
    return {
        name,
        text,
        createdAt: new moment().valueOf()
    }
}
var genLocationMessage = function(name, latitude, longitude) {
    return {
        name,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new moment().valueOf()
    }
}

module.exports = {
    genLocationMessage,
    genMessage
}