import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import { createSession } from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { string } from "zod";

export async function createUserSession(req: Request, res: Response) {
  //validate user password
  const user = await validatePassword(req.body.email, req.body.password);

  if (!user) {
    return res.status(400).json({ msg: "Invalid Email or Password" });
  }
  //create session
  const session = await createSession(user._id, req.get("user-agent") || "");
  //create access token
  console.log(user, session);

  const accessToken = signJwt(
    { user, session: session._id },
    { expiresIn: config.get("accessTokenTTL") }
  );
  console.log("here");

  //create refresh token
  const refreshToken = signJwt(
    { user, session: session._id },
    { expiresIn: config.get("refreshTokenTTL") }
  );
  console.log("here");

  //return access an refresh token
  return res
    .status(200)
    .json({ accessToken: accessToken, refreshToken: refreshToken });
}
