
import { Payment } from "@prisma/client";
import { paymentServBox } from "@/services";
import { PaymentProcess } from "@/protocols";
import { invalidDataError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import { Request , Response , NextFunction } from "express";
import httpStatus from "http-status";


export async function thePayment (req: AuthenticatedRequest, res: Response, next: NextFunction) {

    try {

      const userId = req.userId;
      const buyTicketAnalysis: PaymentProcess = req.body;
      const result = await paymentServBox.thePayment(userId, buyTicketAnalysis);
      console.log('ok')
      return res.status(httpStatus.OK).send(result);

    } catch (error) {

      next(error);
      console.log('find a error, check it')

    }

  }



  export async function pAnalysis (req: AuthenticatedRequest, res: Response, next: NextFunction) {

    try {

      const { userId } = req;
      const { ticketId: buyTicket } = req.query;
      const ticketId = Number(buyTicket);
      if (isNaN(ticketId)) throw invalidDataError([`Sorry, invalid, try again`]);
      console.log('ticket not found')

      const result: Payment = await paymentServBox.pAnalysis({ userId, ticketId });
      console.log('ok')
      return res.status(httpStatus.OK).send(result);

    } catch (error) {

      next(error);
      console.log('find a error, check it')

    }

  }

