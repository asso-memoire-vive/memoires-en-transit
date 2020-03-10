const CLIENT_URL = process.env.API_URL || 'http://localhost:3000'

const express = require('express')
const app = express()
const port = 5000

const markers = [
  {
    name: "Gare d'Austerlitz",
    latlng: [48.8417, 2.3661]
  }, {
    name: 'Gare de Hendaye',
    latlng: [43.3530587, -1.7818216]
  }, {
    name: 'Paris',
    latlng: [48.8387131, 2.4843213]
  }
]

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", CLIENT_URL)
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})


app.get('/', (req, res) => {
  return res.status(200).send(markers)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))