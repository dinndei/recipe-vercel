import jwt from "jsonwebtoken";

const JWT_SECRET =process.env.JWT_SECRET || "156w5f4c6w26f46cr6ge5c4h845ntrhcfuh4389";

export function generateToken(payload: object, accessKey: string = JWT_SECRET , expiresIn = '1h') {

    return jwt.sign(payload, accessKey, { expiresIn: expiresIn });

}
