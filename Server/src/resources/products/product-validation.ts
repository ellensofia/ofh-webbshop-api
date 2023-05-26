import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";
import { validateIdTest } from "../../middlewares/validateObjectId";

const productSchema = Yup.object().shape({
  title: Yup.string().required("Title is required."),
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

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  // QUESTION: Does this have to be async?
  try {
    productSchema.validate(req.body);
    next();
  } catch {
    res.status(400).json({ message: "Invalid product data." });
  }
};
