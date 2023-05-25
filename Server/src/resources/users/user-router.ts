import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { validateObjectId } from "../../middlewares/validateObjectId";
import {
  changeRole,
  checkUserInfo,
  getAllUsers,
  getOneUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./user-controller";
import { validateLogin, validateNewUser } from "./user-validation";

export const userRouter = express
  .Router()
  .post("/api/users/register", validateNewUser, registerUser)
  .get("/api/users", auth, authAdmin, getAllUsers)
  .post("/api/users/login", validateLogin, loginUser)
  .post("/api/users/logout", auth, logoutUser)
  .get("/api/users/checkUserInfo", auth, checkUserInfo)
  .put("/api/users/:id", validateObjectId, auth, authAdmin, changeRole)
  .get("/api/users/:id", validateObjectId, authAdmin, getOneUser);
