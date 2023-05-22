import busboy from "busboy";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { fileBucket } from "./image-model";

export async function uploadImage(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers });
  req.pipe(bb);

  bb.on("file", (_, file, info) => {
    const { filename, mimeType } = info;

    const uploadStream = fileBucket
      .openUploadStream(filename, { contentType: mimeType })
      .on("finish", (data: mongoose.mongo.GridFSFile) => {
        res.status(201).json(data._id);
      });

    file.pipe(uploadStream);
  });
}

export async function getImage(req: Request, res: Response) {
  const _id = new mongoose.mongo.ObjectId(req.params.id);

  const file = await fileBucket.find({ _id }).next();
  if (!file?.contentType) {
    return res.status(404).json({ message: "File not found" });
  }

  res.setHeader("Content-Type", file.contentType);

  const downloadStream = fileBucket.openDownloadStream(_id);
  downloadStream.pipe(res);
}

export async function deleteImage(req: Request, res: Response) {
  const _id = new mongoose.mongo.ObjectId(req.params.id);

  const file = await fileBucket.find({ _id }).next();
  if (!file?.contentType) {
    return res.status(404).json({ message: "File not found" });
  }

  await fileBucket.delete(_id);
  res.status(200).json({ message: `File with id '${_id}' deleted.` });
}
