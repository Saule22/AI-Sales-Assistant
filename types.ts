
export enum Role {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  role: Role;
  content: string;
  catalog?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  duration: string;
  shortDescription: string;
  description: string;
  whoIsItFor: string;
  whatYouWillLearn: string;
  paymentLink: string;
  installmentLink?: string;
  kaspiLink?: string;
}
