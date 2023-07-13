
 
 import { ApplicationError } from "@/protocols";



 export function loginError (): ApplicationError {

    return { name: 'NotFoundError', message: 'Plis, register'};

  }

  
  export function notFound(): ApplicationError {

    return {name: 'NotFoundError',message: 'Not Found'};

  }
  

 
  

  

