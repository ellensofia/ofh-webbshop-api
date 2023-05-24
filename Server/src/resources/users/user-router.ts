import express from "express";
import { auth } from "../../middlewares/auth";
import { authAdmin } from "../../middlewares/authAdmin";
import { changeRole, checkUserInfo, getAllUsers, getOneUser, loginUser, logoutUser, registerUser } from "./user-controller";

export const userRouter = express
  .Router()
  .post("/api/users/register", registerUser)
  .get("/api/users", auth, authAdmin, getAllUsers)
  .put("/api/users/:id", auth, authAdmin, changeRole)
  .get("/api/users/:id", getOneUser)
  .post("/api/users/login", loginUser)
  .post("/api/users/logout", auth, logoutUser)
  .get("/api/users/checkUserInfo", checkUserInfo);
