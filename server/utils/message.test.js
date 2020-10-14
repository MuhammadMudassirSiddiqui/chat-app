var expect = require('expect')
var { genMessage } = require('./message')



describe('function gen message', () => {
    it('should send a message', () => {
        var test = genMessage('Aqsa', 'is every thing goes Well Mudassir ?')

        expect(test.name).toBe('Aqsa')
        expect(test.text).toBe('is every thing goes Well Mudassir ?')
        expect(test.createdAt).toBeA('number')
    })
})