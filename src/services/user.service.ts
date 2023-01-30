import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import bcrypt from "bcrypt";
import { omit } from "lodash";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePasswords">
  >
) {
  try {
    console.log("ia am");
    const saveUser = await UserModel.create(input);
    console.log(saveUser);
    return saveUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword(email: string, password: string) {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = user.comparePasswords(password);
    //const isMatch await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return false;
    }

    // const isValid = await bcrypt.compare(password, user.password);
    return omit(user, "password");
  } catch (error) {
    console.log(error);
  }
}
