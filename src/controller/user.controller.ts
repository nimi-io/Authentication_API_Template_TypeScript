import { Request, Response } from "express";
import { createUser } from "../services/user.service";
import { omit } from "lodash";
import { createUserInput } from "../schema/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) {
  try {
    console.log("b c r");
    const user = await createUser(req.body); //call create user service
    console.log("a c r");

    return res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    return res.status(409).send({ error });
  }
}
