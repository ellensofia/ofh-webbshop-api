import argon2 from "argon2";
import { Request, Response } from "express";
import { UserModel } from "./user-model";

export async function registerUser(req: Request, res: Response) {
  const { username, password, email } = req.body;

  // CHECKS USERNAME TO EXSISTING ONE
  const existsingUser = await UserModel.findOne({
    username,
  });
  if (existsingUser) {
    return res.status(409).json("This username already exists. Please choose another one.");
  }

  // CHECKS EMAIL TO EXSISTING ONE
  const existsingEmail = await UserModel.findOne({
    email,
  });
  if (existsingEmail) {
    return res.status(409).json("This email already exists. Please choose another one.");
  }

  const user = {
    username,
    password,
    email,
  };
  const newUser = await UserModel.create(user);

  req.session!.username = newUser.username;
  req.session!.email = newUser.email;
  req.session!._id = newUser._id;
  req.session!.isAdmin = newUser.isAdmin;

  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  });
}

export async function getAllUsers(req: Request, res: Response) {
  const loggedInUser = req.session;
  const user = await UserModel.findOne({ _id: loggedInUser?._id });

  if (!user?.isAdmin) {
    return;
  }

  const listOfUsers = await UserModel.find({}, { password: 0 });
  res.status(200).json(listOfUsers);
}

export async function changeRole(req: Request, res: Response) {
  const { username, email, isAdmin } = req.body;

  const foundUser = await UserModel.findByIdAndUpdate(
    req.params.id,
    { username, email, isAdmin },
    { new: true, select: "-password" },
  );

  if (!foundUser) {
    res.status(404).json(`User ${req.params.id} was not found.`);
    return;
  }

  return res.status(200).json({
    username: foundUser.username,
    email: foundUser.email,
    isAdmin: foundUser.isAdmin,
    _id: foundUser._id.toString(),
  });
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    res.status(401).json("Incorrect email or password");
    return;
  }
  const isAuth = await argon2.verify(user.password, password);
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

export async function logoutUser(req: Request, res: Response) {
  req.session = null;
  res.sendStatus(204);
}

export async function checkUserInfo(req: Request, res: Response) {
  res.status(200).json({
    _id: req.session!._id,
    username: req.session!.username,
    email: req.session!.email,
    isAdmin: req.session!.isAdmin,
  });
}
