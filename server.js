const express = require('express')
const bodyParser = require('body-parser')

const serverport = process.env.PORT || 3000

const app = express()

// for parsing application/json
app.use(bodyParser.json())

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/api/test', (req, res) => {
  res.send('Hi this is working. If you found this email.')
})

app.listen(serverport, () => {
  console.log('server listening on port ' + serverport)
})
