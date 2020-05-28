'use strict'

const UserController = use('App/Controllers/Http/UserController')

class SessionController {

    async create({ request, auth }) {

        const { email, password } = request.all()
        const token = await auth.attempt(email, password)
        return token
    }
}

module.exports = SessionController
