import { NextFunction, Request, Response } from "express";

export function authAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.session?.isAdmin) {
        return res.status(401).json('You must be admin!')
    }

    next();
}