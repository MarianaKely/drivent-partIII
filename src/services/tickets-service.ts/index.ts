
import ticketRepBox from "@/repositories/tickets-repository";
import { Ticket , TicketType, Enrollment } from "@prisma/client";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { loginError } from "@/errors/box-errors";
import { ticketsRules } from "@/protocols";



export async function createTicket({ userId, ticketTypeId }: ticketsRules): Promise<Ticket> {

    const client: Enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!client) throw loginError();

    const result = await ticketRepBox.createTicket({ ticketTypeId, enrollmentId: client.id });
    return result;

  }

  
  export async function allTickets (): Promise<TicketType[]> {

    const result: TicketType[] = await ticketRepBox.allTickets();
    return result;

  }



  export async function clienTicket (userId: number): Promise<Ticket> {

    const result: Ticket = await ticketRepBox.clienTicket(userId);
    return result;

  }
  

  export const ticketsServBox = {clienTicket , allTickets , createTicket}



