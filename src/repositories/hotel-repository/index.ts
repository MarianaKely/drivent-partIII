 
 import { Hotel , Room } from "@prisma/client";
 import { prisma } from "@/config";




async function hotelList(): Promise <Hotel[]> {


    const result = prisma.hotel.findMany();
    return result;
   
   
   }
   
   
   async function theRoom (hotelId: number): Promise <Hotel & { Rooms: Room[] }> {
   
   
    return prisma.hotel.findUnique({
   
   
      where: { id: hotelId },
      include: {Rooms: true,},
   
   
    });
   
   
   }
   
   
   
   

   const hotelRepBox = {hotelList,theRoom};
   
   

   
   
   export default hotelRepBox;