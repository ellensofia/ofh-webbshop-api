import mongoose from "mongoose";
import { app } from "./app";

async function main() {
  await mongoose.connect("mongodb+srv://nathanaelblackbourn:GFgXPT8AduMXYB2e@main.bgwwo5q.mongodb.net/");

  console.log("Connected to database");

  app.listen(3000, () => console.log("Running on http://localhost:3000"));
}

main().catch(console.error);
