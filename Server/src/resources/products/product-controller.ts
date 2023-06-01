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
  const products = await ProductModel.find({ isArchived: false });
  res.status(200).json(products);
}

export async function getOneProduct(req: Request, res: Response) {
  const productId = req.params.id;
  const product = await ProductModel.findById(productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json(`/${productId} not found.`);
  }
}

export async function editProduct(req: Request, res: Response) {
  const { _id, ...newData } = req.body;

  const product = await ProductModel.findByIdAndUpdate(_id, { isArchived: true });
  if (!product) {
    return res.status(404).json(`Product with ID ${_id} not found`);
  }
  const newProduct = new ProductModel(newData);
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
