import bcrypt from "bcrypt";
import { UserInterface } from "../interfaces/userI";

function validatePass(user: UserInterface, password: string) {
    return bcrypt.compareSync(password, user.password)
}

export default validatePass