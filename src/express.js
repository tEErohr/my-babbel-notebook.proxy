const axios = require('axios')
const express = require('express')
const cors = require('cors')
const { getMetadataFromHTML } = require('./meta')

const logRequest = (req, res, next) => {
  console.log('[%s] %s', req.method, req.originalUrl)
  next()
}

const createServer = (port = 9090) => {
  const app = express()
  app.use(cors())
  app.get('/metadata', logRequest, (req, res, next) => {
    const { url } = req.query
    const decoded = Buffer.from(url, 'base64').toString('utf8')
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
