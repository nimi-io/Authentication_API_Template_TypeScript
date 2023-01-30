import Session from "../models/session.model";

export async function createSession<schemaDocument>(
  userId: object,
  userAgent: string
) {
  const session = await Session.create({ user: userId, userAgent });

  return session;
}
