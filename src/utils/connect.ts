import mongoose from "mongoose";
import config from "config";
import logger from "../utils/logger";

function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    return mongoose.connect(dbUri, () => logger.info("Connected to database"));
  } catch (error) {
    console.log("could not connect to db", error);
    process.exit(1);
  }
}
export default connect;
