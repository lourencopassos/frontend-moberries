export enum OrderStep {
  GO_TO_STEP_2 = "GO_TO_STEP_2",
  GO_TO_STEP_3 = "GO_TO_STEP_3",
  FINISH = "FINISH",
  UPDATE_DURATION_PRICE = "UPDATE_ORDER_PRICE",
  UPDATE_UPFRONT_PAYMENT = "UPDATE_UPFRONT_PAYMENT",
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type SurveyPayload = {
  [OrderStep.GO_TO_STEP_2]: {
    duration: 3 | 6 | 12 | number;
    space: 5 | 10 | 50 | number;
    upfrontPayment: boolean;
    pricePerGigabyte: number;
  };
  [OrderStep.UPDATE_DURATION_PRICE]: {
    duration: 3 | 6 | 12 | number;
    pricePerGigabyte: number;
    space: 5 | 10 | 50 | number;
  };
  [OrderStep.UPDATE_UPFRONT_PAYMENT]: {
    upfrontPayment: boolean;
  };
  [OrderStep.GO_TO_STEP_3]: {
    creditCardNumber: string;
    creditCardExpirationDate: string;
    creditCardSecurityCode: string;
  };
  [OrderStep.FINISH]: {
    email: string;
    acceptance: boolean;
  };
};

export type OrderActions =
  ActionMap<SurveyPayload>[keyof ActionMap<SurveyPayload>];
