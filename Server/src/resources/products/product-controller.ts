import { Request, Response } from "express";
import { ProductModel } from "./product-model";
import mongoose from "mongoose";

export async function registerProduct(req: Request, res: Response) {
  return console.log("Add Product");
}

export async function getAllProducts(req: Request, res: Response) {
  const products = await ProductModel.find({});
  res.status(200).json(products);
  return console.log("Get All Products");
}

export async function getAllProductsFromCategory(req: Request, res: Response) {
  return console.log("Get All Products From Category");
}

export async function getOneProduct(req: Request, res: Response) {
  const productId = req.params._id;
  // Check if the provided postId is a valid ObjectId
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
  return console.log("Update Product");
}
export async function deleteProduct(req: Request, res: Response) {
  return console.log("Delete Product");
}
