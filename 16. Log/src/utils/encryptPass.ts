import bcrypt from "bcrypt";

function encryptPass(password: string) {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10)
    )
}

export default encryptPass;