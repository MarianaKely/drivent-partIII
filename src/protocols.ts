export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
};

export type ViaCEPAddressError = {
  error: boolean;
};

export type ViaCEPAddressResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export type AddressEnrollment = {
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  error?: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type PaymentProcess = {

  ticketId: number;
  cardData: {

    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
    
  };

};


export type buyRules = {

  userId: number;
  ticketId: number;

};


export type createRules = {

  ticketTypeId: number;
  enrollmentId: number;

};


export type ticketsRules = {

  userId: number;
  ticketTypeId: number;
  
};
