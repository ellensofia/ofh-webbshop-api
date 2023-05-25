import mongoose from "mongoose";
import { app } from "./app";

async function main() {
  await mongoose.connect("mongodb+srv://admin:zVUpSNFeT46dGCuI@ofh-webbshop-api.glo7kd3.mongodb.net/");
  //   await mongoose.connect("mongodb://127.0.0.1:27017/twitter");

  console.log("Connected to database");

  app.listen(3000, () => console.log("Running on http://localhost:3000"));
}

main().catch(console.error);
