// import { type } from "os";
import { string, object, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({ required_error: "name is required" }),
    password: string({ required_error: "password is required" }).min(
      6,
      "password too short"
    ),
    passwordConfirm: string({ required_error: "password is required" }),
    email: string({ required_error: "email is required" }).email(
      "not a valid email address"
    ),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Password do not match",
    path: ["Password Confirmation"],
  }),
});

export type createUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirm"
>;
