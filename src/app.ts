import express from "express";

import connect from "./utils/connect";

import config from "config";

import logger from "./utils/logger";

import routes from "./routes/routes";
const app = express();

const port = config.get<number>("port");

app.use(express.json());

app.listen(port, async () => {
  logger.info("listening on port ", port);

  connect();

  routes(app);
});
