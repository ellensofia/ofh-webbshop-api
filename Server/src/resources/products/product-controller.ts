import { Request, Response } from "express";
import mongoose from "mongoose";
import { ProductModel } from "./product-model";
import productUpdateValidationSchema from "./product-update-validation";

export async function registerProduct(req: Request, res: Response) {
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error registering product:", error);
    res.status(500).json({ message: "Could not add product" });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  const products = await ProductModel.find({});
  res.status(200).json(products);
}

export async function getAllProductsFromCategory(req: Request, res: Response) {
  return console.log("Get All Products From Category");
}

export async function getOneProduct(req: Request, res: Response) {
  const productId = req.params._id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: `Invalid post ID.` });
  }
  const product = await ProductModel.findById(productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json(`/${productId} not found.`);
  }
  return console.log("Get Product");
}

export async function editProduct(req: Request, res: Response) {
  const productId = req.params.id;

  const product = await ProductModel.findById(productId);

  if (!product) {
    return res.status(404).json(`Product with ID ${productId} not found`);
  }

  // Validate request body with Yup
   await productUpdateValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  await ProductModel.findByIdAndUpdate(productId, { isArchived: true });

  const newProduct = new ProductModel(req.body);
  await newProduct.save();

  res.status(200).json(newProduct);
}

export async function deleteProduct(req: Request, res: Response) {
  const productId = req.params.id;

  // Check if the product exists
  const existingProduct = await ProductModel.findById(productId);

  if (!existingProduct) {
    return res.status(404).json(`/${productId} not found.`);
  }

  // Delete the product
  await ProductModel.findByIdAndDelete(productId);
  res.status(204).json({ message: "Product deleted successfully" });
}

export async function updateStockOnOrder(productId: string, quantity: number) {
  await ProductModel.findByIdAndUpdate(productId, { $inc: { inStockAmount: -quantity } });
}
