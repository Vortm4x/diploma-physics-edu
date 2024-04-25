import express from 'express'
// const cors = require('cors')
import morgan from 'morgan'

const app = express()
app.use(morgan('combined'))
app.use(express.bodyParser.json())
// app.use(cors()) // lets access from any domain

// app.listen(process.env.port || 8081)