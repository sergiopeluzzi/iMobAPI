'use strict'

const User = use("App/Models/User")

class UserController {

    async create({ request }) {
        const formData = request.only(["username", "email", "password"])
        const user = await User.create(formData)       
        return user
    }
}

module.exports = UserController





