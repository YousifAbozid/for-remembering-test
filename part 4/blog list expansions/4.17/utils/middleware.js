const logger = require("./logger")

/* you can comment this middleware "requestLogger" if you you don't wanna it logging to the console with the info,
 also if you wanna logging to the console, you can use instead morgan library for logging to the console also,
 you can find the link here and follow the instructions : https://github.com/expressjs/morgan */

 const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}