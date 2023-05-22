import argon2 from "argon2";
import { Request, Response } from "express";
import Joi from 'joi';
import { UserModel } from "./user-model";

export async function registerUser(
  req: Request,
  res: Response
) {
  const { username, password, email } = req.body;

  // CHECK FOR MISSING OR INCORRECT VALUES
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).json(result.error.message);
    return;
  }

  // CHECKS USERNAME TO EXSISTING ONE
  const existsingUser = await UserModel.findOne({
    username,
  });
  if (existsingUser) {
    res
      .status(409)
      .json(
        "This username is taken. Please chose another one"
      );
    return;
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