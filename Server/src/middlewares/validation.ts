import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as Yup from "yup";

export const validateBody = (schema: Yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  const validatedData = await schema.validate(req.body);
  req.body = validatedData;
  next();
};

export const validateId = async (req: Request, res: Response, next: NextFunction) => {
  await Yup.string()
    .test("valid-object-id", "Invalid ID.", (value) => {
      return validateIdTest(value);
    })
    .validate(req.params.id);
  next();
};

export const validateIdTest = async (id: string | undefined) => {
  return id ? ObjectId.isValid(id) : false;
};

export const validateImage = (req: Request, res: Response, next: NextFunction) => {
  if (!req.busboy) throw new Error("Busboy is not initialized.");
  req.pipe(req.busboy);
  req.busboy.on("file", (_, file, info) => {
    const { mimeType } = info;
    if (!["image/jpg", "image/jpeg", "image/png"].includes(mimeType)) throw new Error("Invalid file type.");
  });
  next();
};

// ------- Schemas ------- //

// ------- User ------- //

export const userSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  email: Yup.string().email("Email address invalid.").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

// ------- Product ------- //

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

// ------- Order Schemas ------- //

const orderItemSchema = Yup.object().shape({
  product: Yup.string()
    .test("valid-object-id", "Invalid ID.", (value) => {
      return validateIdTest(value);
    })
    .required("Product ID is required."),
  quantity: Yup.number().min(1, "Quantity must be at least 1.").required("Quantity is required."),
});

const addressSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  street: Yup.string().required("Street is required."),
  city: Yup.string().required("City is required."),
  postCode: Yup.string().required("Post code is required."),
  phoneNumber: Yup.string().required("Phone number is required."),
});

export const orderSchema = Yup.object().shape({
  _id: Yup.string()
    .test("valid-object-id", "Invalid ID.", (value) => {
      return validateIdTest(value);
    })
    .required("ID is required."),
  userId: Yup.string()
    .test("valid-object-id", "Invalid ID.", (value) => {
      return validateIdTest(value);
    })
    .required("User ID is required."),
  orderItems: Yup.array().of(orderItemSchema).required("Order items are required."),
  address: addressSchema.required("Address is required."),
  price: Yup.number().min(1, "Price must be at least 1.").required("Price is required."),
  isShipped: Yup.boolean(),
  createdAt: Yup.string(),
  updatedAt: Yup.string(),
});

// ------- Category ------- //

export const categorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
});
