import { Request, Response } from "express";

export async function registerOrder(
    req: Request,
    res: Response
  ) {
      return console.log('Add Order')
  }

  export async function getAllOrders(
    req: Request,
    res: Response
  ) {
      return console.log('Get All Orders')
  }

  export async function markAsShipped(
    req: Request,
    res: Response
  ) {
      return console.log('Update Order')
  }

  export async function getOneOrder(
    req: Request,
    res: Response
  ) {
      return console.log('Get Order')
  }

  export async function getUserOrders(
    req: Request,
    res: Response
  ) {
      return console.log('Get User Orders')
  }