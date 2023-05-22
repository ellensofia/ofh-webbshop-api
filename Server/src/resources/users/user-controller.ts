import { Request, Response } from "express";

export async function registerUser(
  req: Request,
  res: Response
) {
    return console.log('Register User')
}

export async function getAllUsers(
  req: Request,
  res: Response
) {
    return console.log('Get All Users')
}

export async function changeRole(
  req: Request,
  res: Response
) {
    return console.log('Update User')
}
export async function getOneUser(
  req: Request,
  res: Response
) {
    return console.log('Get User')
}
export async function loginUser(
  req: Request,
  res: Response
) {
    return console.log('Login User')
}
export async function logoutUser(
  req: Request,
  res: Response
) {
    return console.log('logout User')
}