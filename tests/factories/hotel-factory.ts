 
 import faker from "@faker-js/faker";
 import { prisma } from "@/config";
 import { Hotel } from "@prisma/client";


 export async function theHotel (params: Partial<Hotel> = {}): Promise<Hotel> {

    const name: string = params.name || faker.company.companyName();
    const image: string = params.image || faker.image.dataUri();
  
    return prisma.hotel.create({

      data: {name,image,},

    });

  }