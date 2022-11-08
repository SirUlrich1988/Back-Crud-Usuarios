const express = require('express')
const db = require('./tools/database')
const cors = require ('cors')

const {port} = require('./config')

const userRouter = require('./users/users.router')

const app = express()

app.use(express.json())
app.use(cors())


db.authenticate()
    .then(() => {
        console.log('Database Authenticated')
    })
    .catch(err => {
        console.log(err)
    })

db.sync()
    .then(() => {
        console.log('Database Synced . . .')
    })
    .catch(err => {
        console.log(err)
    })

app.get('/',(req, res) => {
    res.status(200).json({
        message: 'OK!'
    })
})

app.use('/', userRouter)

app.listen(port, ()=> {
    console.log(`Server started at ${port}`)
})