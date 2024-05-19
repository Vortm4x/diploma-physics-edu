import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => 
    sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: DataTypes.STRING,
    })