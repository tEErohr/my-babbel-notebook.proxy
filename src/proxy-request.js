const axios = require('axios')
const superagent = require('superagent')
const base64 = require('./base64')
const { stripPathFromURL } = require('./utils')

module.exports = function(req, res, next) {
  const { url } = req.query
  const decoded = base64.decode(url)
  const baseURL = stripPathFromURL(decoded)
  const proxyRequest = superagent.get(`${baseURL}/favicon.ico`)
  proxyRequest.on('headers', headers => {
    res.append(headers)
  })
  proxyRequest.pipe(res)
}
