import express from 'express'

module.exports = (app: express.Express) => {
    app.post('/register', (req, res) => {
        res.send({
            message: 'Your user was registered',
            data: req.body
        })
    })
}