import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";

const userSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  email: Yup.string().email("Email address invalid.").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export const validateNewUser = async (req: Request, res: Response, next: NextFunction) => {
  // QUESTION: Does this have to be async?
  try {
    await userSchema.validate(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({ message: err });
  }
  next();
};

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  // QUESTION: Does this have to be async?
  try {
    await userSchema.pick(["username", "password"]).validate(req.body);
    next();
  } catch (err: any) {
    res.status(400).json({ message: err });
  }
};
