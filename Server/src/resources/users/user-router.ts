import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { userSchema, validateBody, validateId } from "../../middlewares/validation";
import {
  changeRole,
  checkUserInfo,
  getAllUsers,
  getOneUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./user-controller";

export const userRouter = express
  .Router()
  .post("/api/users/register", validateBody(userSchema), registerUser)
  .get("/api/users", auth, authAdmin, getAllUsers)
  .post("/api/users/login", validateBody(userSchema.omit(["username"])), loginUser)
  .post("/api/users/logout", auth, logoutUser)
  .get("/api/users/checkUserInfo", auth, checkUserInfo)
  .put("/api/users/:id", validateId, auth, authAdmin, changeRole)
  .get("/api/users/:id", validateId, authAdmin, getOneUser);
