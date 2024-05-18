import express from 'express'
// const cors = require('cors')
import morgan from 'morgan'

const app = express()
const PORT = process.env.port || 8081
app.use(morgan('combined'))
app.use(express.json())
// app.use(cors()) // lets access from any domain


app.get('/status', (req, res) => {
    res.send({
        message: 'hello'
    })
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})