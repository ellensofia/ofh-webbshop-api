import cookieSession from "cookie-session";
import express, { NextFunction, Request, Response } from 'express';


export const app = express();

app.use(express.json());
app.use(cookieSession({
    name: "login",
    secure: false,
    httpOnly: true,
    secret: "lkashfp013u5lkshg",
    maxAge: 1000 * 86400,
}))

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(500);
    console.error(err)
});