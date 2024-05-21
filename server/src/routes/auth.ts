import express from 'express'
import AuthController from '../controllers/AuthController'
import AuthControllerPolicy from '../policies/AuthControllerPolicy';

module.exports = (app: express.Express) => {
    app.post('/register',
        AuthControllerPolicy.register,   
        AuthController.register)
    app.post('/login',
        AuthController.login)
}