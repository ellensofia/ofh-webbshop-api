import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as Yup from "yup";

export const validateIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    Yup.string()
      .test("valid-object-id", "Invalid ID.", (value) => {
        return validateIdTest(value);
      })
      .validate(req.params.id);
    next();
  } catch (err: any) {
    res.status(400).json({ message: err });
  }
};

export const validateIdTest = async (id: string | undefined) => {
  return id ? ObjectId.isValid(id) : false;
};
