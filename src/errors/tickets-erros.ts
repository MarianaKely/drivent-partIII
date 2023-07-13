
import { ApplicationError } from "@/protocols";


export function ticketNotFound(): ApplicationError {

    return { name: 'NotFoundError', message: 'Sorry, we cant find it',};

  }

  
  export function buyError(): ApplicationError {
    
    return {name: 'UnauthorizedError',message: 'Sorry, thats not your ticket',};

  }