const axios = require('axios')
const base64 = require('./base64')
const jsdom = require('jsdom')
const cache = require('./cache')
const { JSDOM } = jsdom

function fetchSource(url) {
  return axios.get(url).then(response => {
    return response.data
  })
}

module.exports = {
  fetchHTML: function(url) {
    const encoded = base64.encode(url)
    return cache.resolve(encoded, () => fetchSource(url)).then(source => new JSDOM(source))
  }
}
