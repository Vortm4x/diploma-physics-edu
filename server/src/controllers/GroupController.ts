import { Request, Response } from 'express'
import * as db from "../models"
import config from "../config/config"
import jwt, { JwtPayload } from "jsonwebtoken"

export default {
    // async addGroup(req: Request, res: Response): Promise<undefined> {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // },
    // async addMember(req: Request, res: Response): Promise<undefined> {
    //     try {
            
    //     } catch (error) {

    //     }
    // }
    async getGroups(req: Request, res: Response): Promise<undefined> {
        try {
            console.log("Incoming getgroups request", req.body);
            const decoded = jwt.verify(req.body.token, config.auth.jwtSecret);
            // const data = JSON.parse(decoded as string);
            const groups = await db.UserGroupModel.findOne({ email: (decoded as JwtPayload).email });
            console.log(groups);
            const prettyGroups = [];
            for (const iterator of groups.groups) {                
                const groupInfo = await db.GroupModel.findOne({ _id: iterator.toString() });

                prettyGroups.push(groupInfo);
            }
            res.send({
                groups: prettyGroups,
            });
            // res.status(500).send();
        } catch (error) {
            console.error("Error occured in getroups controller", error);
            res.status(400).send({
                error: "Probably empty jwt token"
            });
        }
    }

}