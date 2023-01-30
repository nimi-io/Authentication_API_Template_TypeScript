import * as jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");
const secret = config.get<string>("secret");
const accessTokenTTL = config.get<string>("accessTokenTTL");

export function signJwt(
  payload: Object,
  options?: jwt.SignOptions | undefined
) {
  // return jwt.sign(object, privateKey, {
  //   ...(options && options),
  //   algorithm: "RS256",
  // });

  const option = {
    expiresIn: accessTokenTTL,
    // algorithm: "RS256",
  };

  const token = jwt.sign(payload, secret, option);
  console.log(token);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      error: error,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}
