import { Sequelize } from "sequelize"
import config from "../config/config"
// import fs from "fs"
// import path from "path"
import User from "./user"


const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options,
)

const UserModel = {
    User: User(sequelize),
    sequelize: sequelize,
    Sequelize: Sequelize,
};

import mongoose from "mongoose";
import { GroupSchema } from "./group";
import { UserGroupSchema } from "./userGroup";
import { ScenarioSchema } from "./scenario";

const mongoDBUsername = "artemdiachenko1";
const mongoDBPassword = "8LOsFCuJfJVbB9WT";
mongoose.connect(`mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@diploma-physics-edu.y22iw7r.mongodb.net/diploma-physics-edu`)
  .then(() => console.log('MongoDB connected...\n')); //async

const GroupModel = mongoose.model("group", GroupSchema);
const UserGroupModel = mongoose.model("userGroup", UserGroupSchema);
const ScenarioModel = mongoose.model("scenario", ScenarioSchema);

// let instance = new ScenarioModel();
// instance.owner = "abc@gmail.com";
// instance.name = "My Scenario";
// instance.save(); //async



export { 
    UserModel, GroupModel, UserGroupModel, ScenarioModel
}
