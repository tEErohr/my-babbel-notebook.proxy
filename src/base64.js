function encode(text) {
  return Buffer.from(text, 'utf8').toString('base64')
}

function decode(text) {
  return Buffer.from(text, 'base64').toString('utf8')
}

module.exports = {
  encode,
  decode
}

if (process.argv.length > 2) {
  const encoded = encode(process.argv[2])
  console.log(encoded)
}
