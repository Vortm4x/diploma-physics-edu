import express from 'express'
import AuthController from '../controllers/AuthController'

module.exports = (app: express.Express) => {
    app.post('/register', AuthController.register)
}