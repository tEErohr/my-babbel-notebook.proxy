function encode(text) {
  return Buffer.from(text, 'utf8').toString('base64')
}

module.exports = {
  encode
}

if (process.argv.length > 2) {
  const encoded = encode(process.argv[2])
  console.log(encoded)
}
