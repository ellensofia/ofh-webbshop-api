import { Request, Response } from "express";
import { UserModel } from "./user-model";
import argon2 from "argon2";

export async function registerUser(
  req: Request,
  res: Response
) {
    return console.log('Register User')
}

export async function getAllUsers(
  req: Request,
  res: Response
) {
    return console.log('Get All Users')
}

export async function changeRole(
  req: Request,
  res: Response
) {
    return console.log('Update User')
}
export async function getOneUser(
  req: Request,
  res: Response
) {
    return console.log('Get User')
}
export async function loginUser(
  req: Request,
  res: Response
) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    res.status(401).json("Incorrect email or password");
    return;
  }
  const isAuth = await argon2.verify(
    user.password,
    password
  );
  if (!isAuth) {
    res.status(401).json("Incorrect email or password");
    return;
  }

  req.session!.username = user.username;
  req.session!.email = user.email;
  req.session!._id = user._id;
  req.session!.isAdmin = user.isAdmin;

  res.status(200).json({
    _id: user!._id,
    username: user!.username,
    email: user!.email,
    isAdmin: user!.isAdmin,
  });
}
export async function logoutUser(
  req: Request,
  res: Response
) {
    return console.log('logout User')
}