var expect = require('expect')

var { Users } = require('./user')

describe('testing Users', () => {

    beforeEach(() => {
        test = new Users()
        users.users[{
            id: '1',
            name: "haider",
            room: "hello"
        }, {
            id: '2',
            name: "Mudassir",
            room: "Seperate"
        }, {
            id: '3',
            name: "Aqsa",
            room: "hello"
        }]
    })

    // it('it should add new user', () => {
    //         var users = new Users;
    //         var user = {
    //             id: 123,
    //             name: 'haider',
    //             room: 'mnm'
    //         }
    //         var resp = users.addUser(user.id, user.name, user.room)
    //         expect(users.users).toEqual([user])
    //     }),
    // it('should return names of same room', () => {
    //     var userList = test.getUserList('hello')

    //     expect(userList).toEqual(['haider', 'Aqsa'])
    // })
    // it('should return names of same room', () => {
    //     var userList = test.getUserList('Seperate')

    //     expect(userList).toEqual(['Mudassir'])
    // })
    it('testing get user id ', () => {
        var userId = '1'
        var user = test.getUser(userId)

        expect(user.id).toBe(userId)
    })

})