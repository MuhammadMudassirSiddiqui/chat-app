var genMessage = function(name, text) {
    return {
        name,
        text,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    genMessage
}