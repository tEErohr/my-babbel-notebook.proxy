const superagent = require('superagent')
const base64 = require('./base64')
const { getFaviconURL } = require('./favicon')

module.exports = async function(req, res, next) {
  const { url } = req.query
  const decoded = base64.decode(url)
  const faviconURL = await getFaviconURL(decoded)
  const proxyRequest = superagent.get(faviconURL)
  proxyRequest.on('headers', headers => {
    res.append(headers)
  })
  proxyRequest.pipe(res)
}
