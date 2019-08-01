const axios = require('axios')
const express = require('express')
const cors = require('cors')
const { getMetadata } = require('./meta')

const createServer = (port = 9090) => {
  const app = express()
  app.use(cors())
  app.get('/metadata', (req, res) => {
    const { url } = req.query
    const decoded = Buffer.from(url, 'base64').toString('utf8')
    axios
      .get(decoded)
      .then(response => {
        console.log('response.headers', response.headers)
        return getMetadata(response.data)
      })
      .then(data => {
        res.json({ data })
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
