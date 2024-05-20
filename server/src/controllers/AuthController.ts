import { Request, Response } from 'express'
import { db } from "../models"

export default {
    async register(req: Request, res: Response): Promise<undefined> {
        try {
            const user = await db.User.create(req.body);
            res.send(user.toJSON());
        } catch (error) {
            console.error(error);
            res.status(400).send({ error: `User creation failed with email ${req.body.email}` });
        }
    }
}