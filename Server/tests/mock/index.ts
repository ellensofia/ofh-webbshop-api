import { User } from "../../src";
import { clearUsersCollection, insertMockUser } from "./users";

export type MockDB = {
  user: User;
};

/** Resets the database and returns the inserted users and posts */
export async function mockDB(): Promise<MockDB> {
  await clearUsersCollection();

  const user = await insertMockUser();

  return { user };
}
