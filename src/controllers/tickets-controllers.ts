
import { Ticket , TicketType } from "@prisma/client";
import { ticketsServBox } from "@/services";
import { AuthenticatedRequest } from "@/middlewares";
import { Request, Response , NextFunction } from "express";
import httpStatus from "http-status";



export async function createTicket(req: AuthenticatedRequest, res: Response) {

    try {

      const { ticketTypeId } = req.body;
      const userId: number = req.userId;
      const result = await ticketsServBox.createTicket({ userId, ticketTypeId: Number(ticketTypeId) });

      console.log('ok')
      return res.status(httpStatus.CREATED).json(result);

    } catch (error) {
      
      console.log('find a error, check it')  
      return res.status(httpStatus.NOT_FOUND).send(error);

    }

  }
  



  export async function allTickets (_req: Request, res: Response) {

    try {

      const result: TicketType[] = await ticketsServBox.allTickets();
      console.log('ok')
      return res.status(httpStatus.OK).json(result);

    } catch (error) {
 
      console.log('find a error, check it')
      return res.status(httpStatus.BAD_REQUEST).send(error);

    }

  }




  export async function clienTicket (req: AuthenticatedRequest, res: Response) {

    try {

      const userId: number = req.userId;
      const result: Ticket = await ticketsServBox.clienTicket(userId);

      if (result) 
      return res.status(httpStatus.OK).json(result);
      else throw new Error();

    } catch (error) {

      console.log('find a error, check it')
      return res.status(httpStatus.NOT_FOUND).send(error);

    }

  }



