
import Joi from "joi";
import { PaymentProcess } from "@/protocols";

export const paymentSchema = Joi.object<PaymentProcess>({

    ticketId: Joi.number().integer().required(),
    cardData: Joi.object({

      issuer: Joi.string().required(),
      number: Joi.number().integer().required(),
      name: Joi.string().required(),
      expirationDate: Date,
      cvv: Joi.number().integer().required(),

    }).required(),

  }
  
 );