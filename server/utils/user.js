[{
    id: '',
    name: '',
    room: ''
}]

//addUser(id,name,room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// class Person {
//     constructor(name, age) {
//         this.name = name,
//             this.age = age
//     }
//     getUserDiscription() {
//         return `${this.name} is ${this.age} year old`
//     }
// }

// var body = new Person('haider', 18)

// console.log(body.getUserDiscription());


class Users {
    constructor() {
        this.users = []
    }
    addUser(id, name, room) {
        var user = { id, name, room }
        this.users.push(user)
        return user
    }
    removeUser(id) {
        var user = this.getUser(id)
        if (user) {
            this.users = this.users.filter((user) => user.id !== id)
        }
        return user

    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]


    }
    getUserList(room) {
        var user2 = this.users.filter((user) => user.room === room)
        var nameArray = user2.map((user) => user.name)
        return nameArray
    }
}

module.exports = { Users }