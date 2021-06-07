import { Order } from "../../types";
import { OrderStep } from "../types";

export const reducer = (state: Order, action: any) => {
  switch (action.type) {
    case OrderStep.GO_TO_STEP_2:
      return {
        ...state,
        subscriptionParameters: {
          duration: action.payload.duration,
          space: action.payload.space,
          upfrontPayment: action.payload.upfrontPayment,
          pricePerGigabyte: action.payload.pricePerGigabyte,
        },
      };
    case OrderStep.GO_TO_STEP_3:
      return {
        ...state,
        paymentData: {
          creditCardNumber: action.payload.creditCardNumber,
          creditCardExpirationDate: action.payload.creditCardExpirationDate,
          creditCardSecurityCode: action.payload.creditCardSecurityCode,
        },
      };
    case OrderStep.UPDATE_DURATION_PRICE:
      return {
        ...state,
        subscriptionParameters: {
          duration: action.payload.duration,
          pricePerGigabyte: action.payload.pricePerGigabyte,
          space: action.payload.space,
        },
      };
    case OrderStep.UPDATE_UPFRONT_PAYMENT:
      return {
        ...state,
        subscriptionParameters: {
          upfrontPayment: action.payload.upfrontPayment,
        },
      };
    case OrderStep.FINISH:
      return {
        ...state,
        confirmation: {
          email: action.payload.email,
          acceptance: action.payload.acceptance,
        },
      };
    default:
      return state;
  }
};

export const initialState: Order = {
  subscriptionParameters: {
    duration: 12,
    space: 5,
    upfrontPayment: "false",
    pricePerGigabyte: 2,
  },
  paymentData: undefined,
  confirmation: undefined,
};
