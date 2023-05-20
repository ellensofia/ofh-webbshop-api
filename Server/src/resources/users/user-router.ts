import express from "express";
import { changeRole, getAllUsers, getOneUser, loginUser, logoutUser, registerUser } from "./user-controller";

export const userRouter = express
  .Router()
  .post("/api/users/register", registerUser)
  .get("/api/users", getAllUsers)
  .put("/api/users/:id", changeRole)
  .get("/api/users/:id", getOneUser)
  .post("/api/users/login", loginUser)
  .post("/api/users/logout", logoutUser)