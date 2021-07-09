const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5050
const dbConfig = require('./config/DbConfig')
const cors = require('cors')
const path = require('path')

mongoose.connect(dbConfig.mongoURL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to database'))
  .catch(err => console.log(err))

app.use(cors())

app.use(bodyParser.json({
  extended: true,
  limit:'50mb'
}))

app.use(bodyParser.urlencoded({
  extended: true,
  limit:'20mb'
}))

app.use('/image', express.static(path.join(__dirname, 'image')))
app.use('/user', require('./routes/User'))
app.use('/artist', require('./routes/Artist'))

app.listen(port, function() {
  console.log('Server is running on port '+ port)
})