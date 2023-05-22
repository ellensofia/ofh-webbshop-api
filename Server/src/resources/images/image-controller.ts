import busboy from "busboy";
import { Request, Response } from "express";
import { fileBucket } from "./image-model";
import mongoose from "mongoose";

// export async function uploadImage(
//     req: Request,
//     res: Response
//   ) {
//       return console.log('Upload Image')
//   }

//   export async function getImage(
//     req: Request,
//     res: Response
//   ) {
//       return console.log('Get Image')
//   }

//   export async function deleteImage(
//     req: Request,
//     res: Response
//   ) {
//       return console.log('Delete Image')
//   }

export async function uploadImage(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers });
    req.pipe(bb);

    bb.on("file", (_, file, info) => {
      const { filename, mimeType } = info;

      const uploadStream = fileBucket
      .openUploadStream(filename, { contentType: mimeType })
      .on("finish", (data: mongoose.mongo.GridFSFile) => {
      res.status(201).json(data._id);
    })

    file.pipe(uploadStream);


    })
}