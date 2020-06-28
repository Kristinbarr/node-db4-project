const express = require('express')
const server = express()
const recipesRouter = require('./recipes/recipes-router')


const helmet = require('helmet')

server.use(helmet())
server.use(express.json())

server.use('/api', recipesRouter)

module.exports = server