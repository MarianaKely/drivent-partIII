
import { prisma } from "@/config";
import { Payment } from "@prisma/client";
import { PaymentProcess } from "@/protocols";


async function thePayment(payment: PaymentProcess, price: number): Promise<Payment> {

    const result = await prisma.payment.create({

      data: {

        ticketId: payment.ticketId,
        cardIssuer: payment.cardData.issuer,
        cardLastDigits: payment.cardData.number.toString().substring(11, 16),
        value: price,
        
      },

    });

    return result;

  }


  async function pAnalysis(ticketId: number) {

    const result = prisma.payment.findFirst({ where: { ticketId },});
    return result;

  }

  
  export default { pAnalysis, thePayment};