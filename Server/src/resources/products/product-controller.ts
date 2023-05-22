import { Request, Response } from "express";
import { ProductModel } from "./product-model";

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
  return console.log("Get All Products");
}

export async function getAllProductsFromCategory(req: Request, res: Response) {
  return console.log("Get All Products From Category");
}
export async function getOneProduct(req: Request, res: Response) {
  return console.log("Get Product");
}
export async function editProduct(req: Request, res: Response) {
  return console.log("Update Product");
}
export async function deleteProduct(req: Request, res: Response) {
  return console.log("Delete Product");
}
