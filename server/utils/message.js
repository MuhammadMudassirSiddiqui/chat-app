var genMessage = function(name, text) {
    return {
        name,
        text,
        createdAt: new Date().getTime()
    }
}
var genLocationMessage = function(name, latitude, longitude) {
    return {
        name,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    genLocationMessage,
    genMessage
}