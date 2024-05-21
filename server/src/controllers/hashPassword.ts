import bcrypt from "bcrypt-nodejs"

export default {
    hashPassword(password : unknown): string {
        const SALT_FACTOR = 8;

        const salt = bcrypt.genSaltSync(SALT_FACTOR)
        
        const hash = bcrypt.hashSync((password as string), salt) 

        return hash;
    }
}