export interface Order {
  subscriptionParameters: SubscriptionParameters | any;
  paymentData: PaymentData | undefined;
  confirmation: Confirmation | undefined;
}

export interface SubscriptionParameters {
  duration: 3 | 6 | 12;
  space: 5 | 10 | 50;
  upfrontPayment: string;
  pricePerGigabyte: number;
}

export interface PaymentData {
  creditCardNumber: string;
  creditCardExpirationDate: string;
  creditCardSecurityCode: string;
}

export interface Confirmation {
  email: string;
  acceptance: string;
}

export interface Summary {
  subscription: SubscriptionParameters | undefined;
  totalPrice: number | undefined;
  pricePerGigabyte: number | undefined;
}
