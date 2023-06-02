import { User, UserModel } from "../../src";
import { toJSON } from "../support/utils";

export function getMockUser(username = "test", email = "test@email.com", password = 123123, isAdmin = false) {
  return {
    username,
    email,
    password,
    isAdmin,
  };
}

export async function insertMockUser() {
  const user = new UserModel(getMockUser());
  await user.save();
  return toJSON(user) as User;
}

export async function insertMockAdmin() {
  const user = new UserModel(getMockUser("admin", "admin@email.com", 123123, true));
  await user.save();
  return toJSON(user) as User;
}

export async function clearUsersCollection() {
  await UserModel.deleteMany({});
}
