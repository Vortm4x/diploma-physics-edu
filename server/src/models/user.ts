import { DataTypes, Sequelize } from "sequelize";
import HashPassword from "../controllers/hashPassword";


export default (sequelize: Sequelize) => {
    const User = sequelize.define("User", {
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                set(value) {
                    this.setDataValue('password', HashPassword.hashPassword(value));
                },
            }
        },
        {
            hooks: {}
        }
    )

    return User;
}