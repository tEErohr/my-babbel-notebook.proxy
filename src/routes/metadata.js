const metadataRoute = (req, res, next) => {
  const { url } = req.query
  const decoded = base64.decode(url)
  axios
    .get(decoded)
    .then(response => {
      return getMetadataFromHTML(response.data)
    })
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      console.error(error)
      next(error)
    })
}

module.exports = metadataRoute
