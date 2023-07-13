
import { Payment } from "@prisma/client";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepBox from "@/repositories/tickets-repository";
import { PaymentProcess , buyRules } from "@/protocols";
import { ticketNotFound , buyError } from "@/errors/tickets-erros";




export async function pAnalysis({ userId, ticketId }: buyRules): Promise<Payment> {

    const buyTicket = await ticketRepBox.onlyTicket(ticketId);
    if (!buyTicket) throw ticketNotFound();
    if (buyTicket.Enrollment.User.id !== userId) throw buyError();
  
    const result = await paymentRepository.pAnalysis(ticketId);
    return result;

  }
  


  export async function thePayment(userId: number, paymentInfo: PaymentProcess) {

    const buyTicket = await ticketRepBox.onlyTicket(paymentInfo.ticketId);
    if (!buyTicket) {throw ticketNotFound();}
    if (buyTicket.Enrollment.User.id !== userId) throw buyError();
  
    const buyTicketAnalysis = buyTicket.TicketType.price;

    const result = await paymentRepository.thePayment(paymentInfo, buyTicketAnalysis);
    await ticketRepBox.ttStatus(buyTicket.id, 'PAID');
  
    return result;

  }



  export const paymentServBox =  {pAnalysis , thePayment}

   
  
  
  