const urlUtil = require('url')
const { stripPathFromURL } = require('./utils')
const { fetchHTML } = require('./html')

const normalizeURL = baseURL => url => {
  return urlUtil.resolve(baseURL, url)
}
const mapIconEl = baseURL => el => normalizeURL(baseURL)(el.href)

function getFaviconForURLByHTMLSource(url) {
  return fetchHTML(url)
    .then(dom => {
      return dom.window.document.querySelectorAll('[rel="icon"]')
    })
    .then(Array.from)
    .then(icons => icons.shift())
    .then(mapIconEl(url))
    .catch(error => {
      return null
    })
}

function getFaviconForURLByGuessing(url) {
  const baseURL = stripPathFromURL(url)
  return `${baseURL}/favicon.ico`
}

module.exports = {
  getFaviconURL: async url => {
    const found = await getFaviconForURLByHTMLSource(url)
    return [found, getFaviconForURLByGuessing(url)].filter(Boolean).shift()
  }
}
