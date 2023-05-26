import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as Yup from "yup";

export const validateBody = (schema: Yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  const validatedData = await schema.validate(req.body);
  req.body = validatedData;
  next();
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  Yup.string()
    .test("valid-object-id", "Invalid ID.", (value) => {
      return validateIdTest(value);
    })
    .validate(req.params.id);
  next();
};

export const validateIdTest = async (id: string | undefined) => {
  return id ? ObjectId.isValid(id) : false;
};

// ------- Schemas ------- //

export const userSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  email: Yup.string().email("Email address invalid.").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export const productSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "The product title must be at least three characters long.")
    .required("Title is required."),
  price: Yup.number().min(1, "The product must has a price above 0.").required("Price is required."),
  description: Yup.string().required("Description is required."),
  brand: Yup.string(),
  imageId: Yup.string()
    .test("imageId", "Image is required.", (value) => {
      return validateIdTest(value);
    })
    .required("Image is required."),
  inStockAmount: Yup.number().required("In stock amount is required."),
  isArchived: Yup.boolean().required("Is archived is required."),
});
