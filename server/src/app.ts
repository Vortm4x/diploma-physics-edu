import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { db } from './models'
const config = require("./config/config.ts")
// import routesLogin from "./routes/login.ts"

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(cors()) // lets access from any domain
require("./routes/login.ts")(app)


app.get('/status', (req, res) => {
    res.send({
        message: 'hello'
    })
})



db.sequelize.sync().then(() => {
    app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`)
    })
})
