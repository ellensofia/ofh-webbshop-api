import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as Yup from "yup";

export const validateObjectId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Yup.string()
      .test("valid-object-id", "Invalid ID.", (value) => {
        return value ? ObjectId.isValid(value) : false;
      })
      .validate(req.params.id);
    next();
  } catch (err: any) {
    res.status(400).json({ message: err });
  }
};
