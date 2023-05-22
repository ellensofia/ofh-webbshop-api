import { InferSchemaType, Schema, model } from "mongoose";

export const imageSchema = new Schema({
    
});

export type Image = InferSchemaType<typeof imageSchema>;

export const ImageModel = model("image", imageSchema);