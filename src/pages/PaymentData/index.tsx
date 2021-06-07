import React, { useContext, useEffect } from "react";
import OrderStatus from "../../components/OrderStatus";
import { AppContext } from "../../globalState/context";
import { OrderStep } from "../../globalState/types";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";

const PaymentData: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [form, handleFormChange, setForm] = useForm({
    creditCardNumber: "",
    creditCardExpirationDate: "",
    creditCardSecurityCode: "",
  });

  useEffect(() => {
    if (state.paymentData?.creditCardNumber !== "") {
      setForm({
        creditCardNumber: state.paymentData?.creditCardNumber,
        creditCardExpirationDate: state.paymentData?.creditCardExpirationDate,
        creditCardSecurityCode: state.paymentData?.creditCardSecurityCode,
      });
    }
  }, [
    setForm,
    state.paymentData?.creditCardNumber,
    state.paymentData?.creditCardExpirationDate,
    state.paymentData?.creditCardSecurityCode,
  ]);

  let history = useHistory();

  const goToNextStep = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({
      type: OrderStep.GO_TO_STEP_3,
      payload: {
        creditCardNumber: form.creditCardNumber,
        creditCardExpirationDate: form.creditCardExpirationDate,
        creditCardSecurityCode: form.creditCardSecurityCode,
      },
    });
    history.push("/order-confirmation");
  };

  const goToPreviousStep = () => {
    history.goBack();
  };

  return (
    <div className="page__container">
      <section>
        <header className="page__header">
          <h1>Payment Data</h1>
          <p>Insert the payment information</p>
        </header>
        <div>
          <form onSubmit={goToNextStep}>
            <div className="payment-data__input-container">
              <label htmlFor="creditCardNumber">Credit Card Number</label>
              <input
                type="search"
                value={form.creditCardNumber}
                name="creditCardNumber"
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="payment-data__input-container">
              <label htmlFor="creditCardExpirationDate">
                Credit Card Expiration Date
              </label>
              <input
                value={form.creditCardExpirationDate}
                name="creditCardExpirationDate"
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="payment-data__input-container">
              <label htmlFor="creditCardSecurityCode">
                Credit Card Security Code
              </label>
              <input
                type="text"
                value={form.creditCardSecurityCode}
                name="creditCardSecurityCode"
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="page__footer">
              <button type="button" onClick={() => goToPreviousStep()}>
                Return
              </button>
              <button type="submit">Next</button>
            </div>
          </form>
          <OrderStatus />
        </div>
      </section>
    </div>
  );
};

export default PaymentData;
