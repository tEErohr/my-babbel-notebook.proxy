const axios = require('axios')
const express = require('express')
const cors = require('cors')
const base64 = require('./base64')
const { getMetadataFromHTML } = require('./meta')
const faviconRoute = require('./routes/favicon')
const metadataRoute = require('./routes/metadata')

const logRequest = (req, res, next) => {
  console.log('[%s] %s', req.method, req.originalUrl)
  next()
}

const createServer = (port = 9090) => {
  const app = express()
  app.use(cors())
  app.get('/fetch', logRequest, faviconRoute)
  app.get('/favicon', logRequest, faviconRoute)
  app.get('/metadata', logRequest, metadataRoute)

  return new Promise((resolve, reject) => {
    try {
      app.listen(port, () => {
        resolve()
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createServer
}
