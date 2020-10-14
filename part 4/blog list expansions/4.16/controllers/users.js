const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({})

  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    if (request.body.password.length < 3) {
        return response.status(400).json({error : "Password length is shorter than 3 characters"})
    }
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser.toJSON())
})

module.exports = usersRouter
