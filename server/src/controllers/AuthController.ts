import { Request, Response } from 'express'
import { db } from "../models"

export default {
    async register(req: Request, res: Response): Promise<undefined> {
        try {
            const user = db.User.create(req.body);
            res.send((await user).toJSON());
        } catch (error) {
            console.error(error);
            res.status(400).send(`User creation failed with email ${req.body.email}`);
        }
        // res.send({
        //     message: 'Your user was registered',
        //     data: req.body
        // })
    }
}