import argon2 from "argon2";
import { InferSchemaType, Schema, model } from "mongoose";

export const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  isAdmin: { type: Boolean, default: false },
});

userSchema.pre("save", async function () {
  this.password = await argon2.hash(this.password, {
    timeCost: 2,
    memoryCost: 1024,
  });
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("user", userSchema);
