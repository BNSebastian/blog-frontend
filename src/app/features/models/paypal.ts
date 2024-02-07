export interface PaymentInterface {
  price: number;
  currency: string;
  method: string;
  intent: string;
  description: string;
}
