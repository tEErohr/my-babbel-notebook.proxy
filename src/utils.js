const urlUtil = require('url')

module.exports = {
  stripPathFromURL: url => {
    const { protocol, hostname } = urlUtil.parse(url)
    return urlUtil.format({ protocol, hostname })
  }
}
