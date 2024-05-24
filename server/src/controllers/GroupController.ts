import { Request, Response } from 'express'
import * as db from "../models"
import config from "../config/config"
import jwt, { JwtPayload } from "jsonwebtoken"
import { addMemberToGroup } from '../models/group'

export default {
    async addMember(req: Request, res: Response): Promise<undefined> {
        try {
            const decoded = jwt.verify(req.body.token, config.auth.jwtSecret);
            const email = req.body.email;
            const owner = (decoded as JwtPayload).email;
            const groupName = req.body.group;
            const group = await db.GroupModel.findOne({ owner: owner, name: groupName });
            const newMember = await db.UserModel.User.findOne({ where: { email: email } });
            if (!group || !newMember) {
                res.status(400).send({
                    error: "Probably wrong data"
                });
                return;
            }
            // console.log(newMember);
            
            addMemberToGroup(group, newMember, db.UserGroupModel);

            await group.save();
            res.send({ group: group });
        } catch (error) {
            console.error("Error occured in addgroup controller", error);
            res.status(400).send({
                error: "Probably wrong data"
            });
        }
    },
    async addGroup(req: Request, res: Response): Promise<undefined> {
        try {
            const decoded = jwt.verify(req.body.token, config.auth.jwtSecret);
            const name = req.body.name;
            const owner = (decoded as JwtPayload).email;
            const group = new db.GroupModel({ owner: owner, name: name });
            await group.save();

            const email = owner;
            const newMember = await db.UserModel.User.findOne({ where: { email: email } });
            if (!group || !newMember) {
                res.status(400).send({
                    error: "Probably wrong data"
                });
                return;
            }
            // console.log(newMember.dataValues);

            addMemberToGroup(group, newMember, db.UserGroupModel);
            
            res.send({ group: group });
        } catch (error) {
            console.error("Error occured in addgroup controller", error);
            res.status(400).send({
                error: "Probably wrong data"
            });
        }
    },
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