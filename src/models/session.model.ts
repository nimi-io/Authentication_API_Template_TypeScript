import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { NextFunction } from "connect";
import { UserDocument } from "./user.model";
import { boolean, string } from "zod";

export interface schemaDocument extends mongoose.Document {
  // user: UserDocument["_id"];
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
  userAgent: string;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    isValid: { type: "boolean", default: true },
    isUserAgent: { type: "string" },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model<schemaDocument>("Session", sessionSchema);
export default Session;
