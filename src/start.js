const { createServer } = require('./express')

createServer()
  .then(() => {
    console.log('Server running')
  })
  .catch(error => {
    console.error(error)
  })
