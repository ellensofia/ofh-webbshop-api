import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";
import { validateIdTest } from "../../middlewares/validateObjectId";

const productSchema = Yup.object().shape({
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

export const validateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const isValid = await productSchema.isValid(req.body);
  isValid ? next() : res.status(400).json({ error: "Invalid product data." });
};
