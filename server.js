const express = require('express')
const { Nuxt } = require('nuxt')
const awsServerlessExpress = require('aws-serverless-express')

const app = express()
const config = require('./nuxt.config')
config.dev = false
config.mode = 'universal'
const nuxt = new Nuxt(config)

app.use(nuxt.render)

const server = awsServerlessExpress.createServer(app)

exports.render = (event, context) => {
  awsServerlessExpress.proxy(server, event, context)
}
