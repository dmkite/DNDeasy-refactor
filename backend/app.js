const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load()
}

app.disable('x-powered-by')
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))

app.use((req, res, next) => {
    next({status:404, message: "we couldn't find what you're looking for"})
})

app.use((err, req, res ,next) => {
    console.log(err)
    status = err.status || 500
    res.status(status).send({error: err.message})
})

const listener = () => console.log(`Throwing down on port ${port}`)
app.listen(port, listener)