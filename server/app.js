if(!process.env.NODE_ENV || process.env.NODE_ENV == "development"){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const routes = require('./routes/index')
const errhandler = require('./middlewares/errHandler')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use('/', routes)
app.use(errhandler)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))