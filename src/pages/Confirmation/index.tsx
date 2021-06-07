import React, { useContext, useState } from "react";
import { AppContext } from "../../globalState/context";
import { OrderStep } from "../../globalState/types";
import { useForm } from "../../hooks/useForm";
import { setOrder } from "../../service/api";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import OrderSummary from "../../components/OrderSummary";

const Confirmation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const [form, handleFormChange] = useForm({
    email: "",
    acceptance: "false",
  });

  let history = useHistory();

  const confirm = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({
      type: OrderStep.FINISH,
      payload: {
        email: form.email,
        acceptance: form.acceptance,
      },
    });
    setLoading(true);
    const status = await setOrder(state);

    if (status === 200) {
      setLoading(false);
      history.push("/sucess");
    }
  };

  const goToPreviousStep = () => {
    history.goBack();
  };

  return (
    <div className="page__container">
      {loading && (
        <div className="loader__container">
          <Loader
            type="TailSpin"
            color="#272829"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      )}
      {!loading && (
        <section>
          <header className="page__header">
            <h1>Confirmation</h1>
            <p>Check and confirm your order</p>
          </header>
          <OrderSummary />
          <div>
            <form onSubmit={confirm}>
              <label htmlFor="email">Email</label>
              <div className="payment-data__input-container">
                <input
                  type="type"
                  value={form.email}
                  name="email"
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="payment-data__input-container">
                <p>Do you accept terms and conditions?</p>
                <label>Yes</label>
                <input
                  type="checkbox"
                  value={form.acceptance}
                  name="acceptance"
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="page__footer">
                <button type="button" onClick={() => goToPreviousStep()}>
                  Return
                </button>
                <button type="submit">Confirm Order</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default Confirmation;
