import { Request, Response } from "express";

const categories: string[] = [];

export async function createCategory(req: Request, res: Response) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    categories.push(name);
    console.log("categories: ", categories); // Skriv ut kategorierna i konsolen för teständamål

    res.status(201).json({ message: "Category created successfully", categories: categories });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
}

export async function getAllCategories(req: Request, res: Response) {
  try {
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
}

export async function getSpecificCategories(req: Request, res: Response) {
  return console.log("Get Category");
}
