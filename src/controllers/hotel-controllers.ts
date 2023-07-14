


import { hotelServBox } from "@/services";
import { Hotel } from "@prisma/client";
import { Request , Response , NextFunction } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";




export async function hotelList (req: AuthenticatedRequest, res: Response, next: NextFunction) {

   try {

     const client = req.userId;
     const result: Hotel[] = await hotelServBox.hotelList(client);
     console.log('ok')
     return res.status(httpStatus.OK).json(result);

   } catch (error) {


     next(error);
     console.log('find a error, check it')

   }

 }


 export async function theRoom (req: AuthenticatedRequest, res: Response, next: NextFunction) {

   try {

     const client = req.userId;
     const hotelId = req.params.hotelId;
     const result = await hotelServBox.chooseRoom(client, Number(hotelId));
     console.log('ok')
     return res.status(httpStatus.OK).json(result);

   } catch (error) {

     next(error);
     console.log('find a error, check it')

   }

 }
