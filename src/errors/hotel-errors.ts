
import { ApplicationError } from "@/protocols";


export function noHotelRegister(id: number): ApplicationError {


    return {name: 'NotFoundError',message: `Sorry, we can't find a register of ${id}`};
 
 
  }
 
 
   export function anyHotelsListed(): ApplicationError {
 
 
    return { name: 'NotFoundError', message: 'None found'};
 
 
  }
 