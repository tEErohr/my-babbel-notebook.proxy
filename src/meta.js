const jsdom = require('jsdom')
const { JSDOM } = jsdom

function filterMetadata({ name, content }) {
  return content.length > 2
}

function getMetadata(html) {
  const doc = new JSDOM(html)
  const metadata = Array.from(doc.window.document.querySelectorAll('meta'))
    .map(node => {
      return {
        name: node.name || node.property,
        content: node.content
      }
    })
    .filter(filterMetadata)
  return metadata
}

module.exports = {
  getMetadata
}
