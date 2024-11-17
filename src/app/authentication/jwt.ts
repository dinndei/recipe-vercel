import jwt from "jsonwebtoken";

const myAccessKey = "156w5f4c6w26f46cr6ge5c4h845ntrhcfuh4389";

export function generateToken(payload: string, accessKey: string = myAccessKey, expiresIn = '1h') {

    return jwt.sign(payload, accessKey, { expiresIn: expiresIn });

}
