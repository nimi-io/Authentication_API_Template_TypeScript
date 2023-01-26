import { info } from "console";
import { Express, Request, Response } from "express";
import logger from "../utils/logger";
import { createUserHandler } from "../controller/user.controller";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

function routes(app: Express) {
  app.get("/api", (req: Request, res: Response) => {
    console.log("it is here");
    logger.info("it is here");
    res.sendStatus(200);
  });

  app.post("/api/users", validate(createUserSchema), createUserHandler);
}

export default routes;
