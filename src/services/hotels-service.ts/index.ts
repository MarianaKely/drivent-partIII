

import { paymentError } from "@/errors";
import { noHotelRegister , anyHotelsListed } from "@/errors/hotel-errors";
import { loginError , notFound } from "@/errors";
import { Room , Hotel } from "@prisma/client";
import hotelRepBox from "@/repositories/hotel-repository";
import ticketRepBox from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";






export async function chooseRoom (userId: number, hotelId: number): Promise<Hotel & { Rooms: Room[] }> {
   const client = await enrollmentRepository.findWithAddressByUserId(userId);
   if (!client) throw loginError();
   const buyTicket = await ticketRepBox.clienTicket(userId);
   if (!buyTicket) throw notFound();


   const buyTicketAnalysis = buyTicket.status;
   if (buyTicket.TicketType.isRemote) throw paymentError('Please check, this ticket is for a remote event');
   if (!buyTicket.TicketType.includesHotel) throw paymentError('Please check, this ticket does not include a hotel');
   if (buyTicketAnalysis !== 'PAID') throw paymentError('Please check, ticket still needs payment');
    const clientRoom = await hotelRepBox.theRoom(hotelId);


   if (!clientRoom) throw noHotelRegister(hotelId);
   return clientRoom;


 }



export async function hotelList (userId: number): Promise<Hotel[]> {


   const userRegister = await enrollmentRepository.findWithAddressByUserId(userId);
   if (!userRegister) throw loginError();


   const buyTicket = await ticketRepBox.clienTicket(userId);
   if (!buyTicket) throw notFound();


   const buyTicketAnalysis = buyTicket.status;
   if (buyTicket.TicketType.isRemote) throw paymentError('Please check, this ticket is for a remote event');
   if (!buyTicket.TicketType.includesHotel) throw paymentError('Please check, this ticket does not include a hotel');
   if (buyTicketAnalysis !== 'PAID') throw paymentError('Please check, ticket still needs payment');


const allHotelsIntheList: Hotel[] = await hotelRepBox.hotelList();


 if (allHotelsIntheList.length < 1) throw anyHotelsListed();
 return allHotelsIntheList;
 }





export const hotelServBox = { chooseRoom , hotelList}




