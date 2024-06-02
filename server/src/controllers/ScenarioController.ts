import { Request, Response } from 'express'
import * as db from "../models"
import config from "../config/config"
import jwt, { JwtPayload } from "jsonwebtoken"

export default {
    async getScenarios(req: Request, res: Response): Promise<undefined> {
        try {
            const decoded = jwt.verify(req.body.token, config.auth.jwtSecret);
            const scenarios = await db.ScenarioModel.find({ owner: (decoded as JwtPayload).email });
            res.send({
                scenarios: scenarios,
            });
        } catch (error) {
            console.error("Error occured in getScenarios controller", error);
            res.status(400).send({
                error: "Probably empty jwt token"
            });
        }
    },
    async addScenario(req: Request, res: Response): Promise<undefined> {
        try {
            const decoded = jwt.verify(req.body.token, config.auth.jwtSecret);
            const name = req.body.name;
            const owner = (decoded as JwtPayload).email;
            const scenario = new db.ScenarioModel({ owner: owner, name: name });
            await scenario.save();
            
            res.send({ scenario: scenario });
        } catch (error) {
            console.error("Error occured in addScenario controller", error);
            res.status(400).send({
                error: "Probably wrong data"
            });
        }
    },
}