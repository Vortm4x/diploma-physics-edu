import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { UserModel } from './models'
import config from "./config/config"
// import routesLogin from "./routes/login.ts"

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(cors()) // lets access from any domain
require("./routes/auth.ts")(app)
require("./routes/group.ts")(app)
require("./routes/scenario.ts")(app)
require("./routes/sharedScenario.ts")(app)


app.get('/status', (req, res) => {
    res.send({
        message: 'hello'
    })
})


// .sync({force: true}) clears the UserModel every time
UserModel.sequelize.sync().then(() => {
    app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}\n`)
    })
})
