var expect = require('expect')

var { isRealString } = require('./validation')

describe('is shuld be true', () => {
    it('should pass', () => {
        expect(isRealString('Ahmar')).toBe(true)


    })
    it('should fail bcz of non string value', () => {
        Ahmar = 123

        expect(isRealString(Ahmar)).toBe(false)
    })
    it('should fail bcz of not any value', () => {
        Ahmar;

        expect(isRealString(Ahmar)).toBe(false)
    })
})