import { Request, Response } from "express";

export async function registerProduct(
    req: Request,
    res: Response
  ) {
      return console.log('Add Product')
  }
  
  export async function getAllProducts(
    req: Request,
    res: Response
  ) {
      return console.log('Get All Products')
  }
  
  export async function getAllProductsFromCategory(
    req: Request,
    res: Response
  ) {
      return console.log('Get All Products From Category')
  }
  export async function getOneProduct(
    req: Request,
    res: Response
  ) {
      return console.log('Get Product')
  }
  export async function editProduct(
    req: Request,
    res: Response
  ) {
      return console.log('Update Product')
  }
  export async function deleteProduct(
    req: Request,
    res: Response
  ) {
      return console.log('Delete Product')
  }