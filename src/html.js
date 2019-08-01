const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

module.exports = {
  fetchHTML: function(url) {
    return axios.get(url).then(response => {
      return new JSDOM(response.data)
    })
  }
}
