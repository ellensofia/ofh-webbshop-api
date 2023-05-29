import busboy from "connect-busboy";
import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import * as yup from "yup";
import { categoryRouter } from "./resources/categories/category-router";
import { imageRouter } from "./resources/images/image-router";
import { orderRouter } from "./resources/orders/order-router";
import { productRouter } from "./resources/products/product-router";
import { userRouter } from "./resources/users/user-router";

export const app = express();

app.use(busboy());

app.use(express.json());
app.use(
  cookieSession({
    name: "login",
    secure: false,
    httpOnly: true,
    secret: "lkashfp013u5lkshg",
    maxAge: 1000 * 86400,
  }),
);
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter);
app.use(categoryRouter);
app.use(imageRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof yup.ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
  next(err); // Pass the error to the next error handler
});
