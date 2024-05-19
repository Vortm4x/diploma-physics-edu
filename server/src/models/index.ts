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

const db = {
    User: User(sequelize),
    sequelize: sequelize,
    Sequelize: Sequelize,
};

export { 
    db
}
