import { Request, Response } from 'express'
import * as db from "../models"
import config from "../config/config"
import jwt, { JwtPayload } from "jsonwebtoken"
import { ClientSession } from 'mongoose'

export default {
    async updateMark(req: Request, res: Response): Promise<undefined> {
        let session: ClientSession;
        try {
            const decoded = jwt.verify(req.body.token, config.auth.jwtSecret);
            await db.SharedScenarioModel.startSession().then(async _session => {
                    session = _session;
                    return session.withTransaction(() => {
                        return (async () => {
                            try {
                                const sharedScenario = await db.SharedScenarioModel.findById(req.body.id).session(session);
                                const emailNoDots = ((decoded as jwt.JwtPayload).email as string).replace('.', '');
                                const previousResult = sharedScenario.marks.get(emailNoDots);
                                const newResult = (previousResult as number) > req.body.mark ? previousResult : req.body.mark;
                                sharedScenario.marks.set(emailNoDots, newResult);
                                await sharedScenario.save({ session: session, checkKeys: false });
                            } catch (error) {
                                console.error("Error occurred in updateMark controller in transaction", error);
                            }
                        })();
                    })
                }
            );
            res.status(200).send();
        } catch (error) {
            console.error("Error occured in updateMark controller", error);
            res.status(400).send({
                error: "Probably empty jwt token"
            });
        } finally {
            await session.endSession();
        }
    },
    async shareScenario(req: Request, res: Response): Promise<undefined> {
        try {
            const decoded = jwt.verify(req.body.token, config.auth.jwtSecret);
            const scenarioName = req.body.name;
            const owner = (decoded as JwtPayload).email;
            let session: ClientSession;
            let sharedScenario;

            await db.SharedScenarioModel.startSession().then(async _session => {
                    session = _session;
                    return session.withTransaction(() => {
                        return (async () => {
                            try {
                                const scenario = await db.ScenarioModel.findOne({ owner: owner, name: scenarioName }).session(session);
                                const group = await db.GroupModel.findOne({ name: req.body.groupName }).session(session);
                                sharedScenario = await db.SharedScenarioModel.create([{
                                    name: scenarioName,
                                    owner: scenario.owner,
                                    dateShared: Date.now(),
                                    data: scenario.data,
                                    marks: [],
                                }], { session: session });
                                // sharedScenario[0].save({ session: session }); // not a model
                                group.sharedScenarios.push(sharedScenario[0]._id);
                                await group.save({ session: session });
                            } catch (error) {
                                console.error("Error occurred in shareScenario controller in transaction", error);
                            }
                        })();
                    })
                }
            );
            await session.endSession();
            console.log("\nShared scenario\n ", sharedScenario[0]);
            res.send({ scenario: sharedScenario[0] });
        } catch (error) {
            console.error("Error occured in shareScenario controller", error);
            res.status(400).send({
                error: "Probably wrong data"
            });
        }
    },
    async getSharedScenario(req: Request, res: Response): Promise<undefined> {
        try {            
            const scenarioId = req.body.id;
            const sharedScenario = await db.SharedScenarioModel.findById(scenarioId);

            if (!sharedScenario) {
                res.status(400).send({
                    error: "Probably wrong data"
                });
                return;
            }
            
            // console.log("\nShared scenario\n ", sharedScenario);
            res.send({ scenario: sharedScenario });
        } catch (error) {
            console.error("Error occured in shareScenario controller", error);
            res.status(400).send({
                error: "Probably wrong data"
            });
        }
    },
}