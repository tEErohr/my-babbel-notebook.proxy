const axios = require('axios')
const express = require('express')
const cors = require('cors')
const base64 = require('./base64')
const { getMetadataFromHTML } = require('./meta')
const proxyRequest = require('./proxy-request')

const logRequest = (req, res, next) => {
  console.log('[%s] %s', req.method, req.originalUrl)
  next()
}

const createServer = (port = 9090) => {
  const app = express()
  app.use(cors())
  app.get('/fetch', logRequest, proxyRequest)
  app.get('/metadata', logRequest, (req, res, next) => {
    const { url } = req.query
    const decoded = base64.decode(url)
    axios
      .get(decoded)
      .then(response => {
        return getMetadataFromHTML(response.data)
      })
      .then(data => {
        res.json(data)
      })
      .catch(error => {
        console.error(error)
        next(error)
      })
  })
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
