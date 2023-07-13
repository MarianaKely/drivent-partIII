
import { prisma } from "@/config";
import { Ticket , TicketType } from "@prisma/client";
import { createRules } from "@/protocols";


  async function ttStatus (ticketId: number, status: 'PAID' | 'RESERVED') {

    await prisma.ticket.update({ where: { id: ticketId }, data: { status } });
    
  }


async function createTicket({ ticketTypeId, enrollmentId }: createRules): Promise<Ticket> {

    const result = prisma.ticket.create({

      data: {
        status: 'RESERVED',
        enrollmentId,
        ticketTypeId,
      },

      select: {
        id: true,
        ticketTypeId: true,
        enrollmentId: true,
        status: true,
        createdAt: true,
        updatedAt: true,

        TicketType: {

          select: {
            id: true,
            name: true,
            price: true,
            isRemote: true,
            includesHotel: true,
            createdAt: true,
            updatedAt: true,

          },

        },

      },

    });

    return result;

  }




  async function onlyTicket (ticketId: number) {

    return prisma.ticket.findUnique({

      where: { id: ticketId },
      include: {

        Enrollment: {

          include: { User: true,},

        },

        TicketType: true,

      },

    });

  }



  async function clienTicket (userId: number) {

    const result = prisma.ticket.findFirst({

      select: {

        id: true,
        ticketTypeId: true,
        enrollmentId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        TicketType: {

          select: {
            id: true,
            name: true,
            price: true,
            isRemote: true,
            includesHotel: true,
            createdAt: true,
            updatedAt: true,

          },

        },

      },
      where: {

        Enrollment: { userId: userId,},

      },

    }
    
    );

    return result
}



async function allTickets(): Promise <TicketType[]> {

    const result = prisma.ticketType.findMany();
    return result;

}


 


  const ticketRepBox = { allTickets, onlyTicket, clienTicket, createTicket, ttStatus,};

  
  export default ticketRepBox;
  