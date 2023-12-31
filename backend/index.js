const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

//to access database from frontend
var cors = require('cors') 
app.use(cors())

//to access the req body use a middleware
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})