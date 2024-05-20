import { Request, Response, NextFunction } from 'express'
import Joi from "joi"


export default {
    register(req: Request, res: Response, next: NextFunction) : undefined {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        })

        const {error/*, value*/} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context?.key) {
                case 'email':
                    res.status(400).send({
                        error: "you must provide a valid email address"
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: "you must provide a valid password"
                    })
                    break
                default:
                    res.status(400).send({
                        error: "invalid registration information"
                    })
            }
        } else {
            next()
        }
    }
}