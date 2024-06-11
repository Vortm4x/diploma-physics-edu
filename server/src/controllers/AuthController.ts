import { Request, Response } from 'express'
import { UserModel, UserGroupModel } from "../models"
import jwt from "jsonwebtoken";
import config from "../config/config"
import bcrypt from "bcrypt-nodejs"

function jwtSignUser(user: JSON) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: ONE_WEEK,
    });
}

function comparePassword(candidatePassword : string, password: string) {    
    return bcrypt.compareSync(candidatePassword, password);
}

export default {
    async register(req: Request, res: Response): Promise<undefined> {
        try {
            const user = await UserModel.User.create(req.body);
            await UserGroupModel.create({ email: req.body.email });
            res.send({
                user: user.toJSON(),
                jwtToken: jwtSignUser(user.toJSON()),
            });
        } catch (error) {
            console.error(error);
            res.status(400).send({ error: `User creation failed with email ${req.body.email}` });
        }
    },
    async login(req: Request, res: Response): Promise<undefined> {
        try {
            const {email, password} = req.body;
            const user = await UserModel.User.findOne({
                where: {
                    email: email,
                }
            });

            if (!user) {
                res.status(403).send({
                    error: "The login information is incorrect"
                });
                return;
            }

            console.log(user);
            
            const isPasswordValid = comparePassword(password, user.getDataValue("password"));

            if (!user || !isPasswordValid) {
                res.status(403).send({
                    error: "The login information is incorrect"
                });
            } else {
                res.send({
                    user: user.toJSON(),
                    jwtToken: jwtSignUser(user.toJSON()),
                });
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: `Something went wrong while trying to log in` });
        }
    }
}