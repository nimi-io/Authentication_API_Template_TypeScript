import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

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
