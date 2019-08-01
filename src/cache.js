const path = require('path')
const fs = require('fs')

const CACHE_ROOT = path.resolve(process.env.HOME, '.my-babbel-notebook')

fs.mkdirSync(CACHE_ROOT, {
  recursive: true
})

function hasItem(key) {
  return fs.existsSync(path.resolve(CACHE_ROOT, key))
}

function fetchItem(key) {
  return fs.readFileSync(path.resolve(CACHE_ROOT, key))
}

function storeItem(key, data) {
  return fs.writeFileSync(path.resolve(CACHE_ROOT, key), data)
}

function resolve(key, provider) {
  if (hasItem(key)) {
    return Promise.resolve(fetchItem(key))
  } else {
    return provider().then(data => {
      storeItem(key, data)
      return data
    })
  }
}

module.exports = {
  resolve
}
