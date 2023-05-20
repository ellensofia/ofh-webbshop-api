import express from "express";
import { getAllUsers, getUser, loginUser, logoutUser, registerUser, updateUser } from "./user-controller";

export const userRouter = express
  .Router()
  .post("/api/users/register", registerUser)
  .get("/api/users", getAllUsers)
  .put("/api/users/:id", updateUser)
  .get("/api/users/:id", getUser)
  .post("/api/users/login", loginUser)
  .post("/api/users/logout", logoutUser)