import { Request, Response } from "express";

export async function getAllCategories(
    req: Request,
    res: Response
  ) {
      return console.log('Get All Categories')
  }

  export async function getSpecificCategories(
    req: Request,
    res: Response
  ) {
      return console.log('Get Category')
  }