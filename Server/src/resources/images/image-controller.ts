import { Request, Response } from "express";

export async function uploadImage(
    req: Request,
    res: Response
  ) {
      return console.log('Upload Image')
  }

  export async function getImage(
    req: Request,
    res: Response
  ) {
      return console.log('Get Image')
  }

  export async function deleteImage(
    req: Request,
    res: Response
  ) {
      return console.log('Delete Image')
  }