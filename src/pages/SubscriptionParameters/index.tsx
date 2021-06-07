import React, { useEffect, useContext, useState } from "react";
import OrderStatus from "../../components/OrderStatus";
import { AppContext } from "../../globalState/context";
import { OrderStep } from "../../globalState/types";
import { useForm } from "../../hooks/useForm";
import { getPrices } from "../../service/api";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";

const SubscriptionParameters: React.FC = () => {
  const [pricePerGigabyte, setPricePerGigabyte] = useState(2);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(AppContext);
  const [form, handleFormChange] = useForm({
    duration: 12,
    space: 5,
    upfrontPayment: "false",
    pricePerGigabyte,
  });

  let history = useHistory();

  const goToPaymentData = () => {
    history.push("/payment-data");
  };

  useEffect(() => {
    getData().then(() => setLoading(false));
  }, []);

  const getData = async () => {
    const { subscription_plans } = await getPrices();
    setPrices(subscription_plans);
  };

  const contractSpace = [5, 10, 50];
  const booleanUpfrontPayment = ["true", "false"];

  const goToNextStep = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({
      type: OrderStep.GO_TO_STEP_2,
      payload: {
        upfrontPayment: form.upfrontPayment,
        space: Number(form.space),
        duration: Number(form.duration),
        pricePerGigabyte,
      },
    });
    goToPaymentData();
  };

  const handleFormDurationPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    price: number
  ) => {
    handleFormChange(event);

    const numberPrice = Number(price);

    dispatch({
      type: OrderStep.UPDATE_DURATION_PRICE,
      payload: {
        duration: Number(event.target.value),
        pricePerGigabyte: numberPrice,
        space: Number(form.space),
      },
    });
    setPricePerGigabyte(numberPrice);
  };

  const handleFormSpace = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFormChange(event);
    dispatch({
      type: OrderStep.UPDATE_DURATION_PRICE,
      payload: {
        duration: Number(form.duration),
        pricePerGigabyte,
        space: Number(event.target.value),
      },
    });
  };

  return (
    <div className="page__container">
      {!loading && (
        <section>
          <header className="page__header">
            <h1>Subscription Parameters</h1>
            <p>Select the subscription parameters</p>
          </header>
          <div>
            <form onSubmit={goToNextStep}>
              <p>Contract duration:</p>
              <div>
                {prices.map(({ duration_months, price_usd_per_gb }, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="radio"
                        value={duration_months}
                        name="duration"
                        key={duration_months}
                        onChange={(e) =>
                          handleFormDurationPrice(e, price_usd_per_gb)
                        }
                        required
                        defaultChecked={
                          duration_months ===
                          state.subscriptionParameters.duration
                        }
                      />
                      <label htmlFor="duration" key={index}>
                        {duration_months} Months - USD {price_usd_per_gb} per gb
                      </label>
                    </div>
                  );
                })}
              </div>
              <p>Select the space you want to hire</p>
              {contractSpace.map((space, index) => {
                return (
                  <div key={index}>
                    <input
                      type="radio"
                      value={space}
                      name="space"
                      key={space}
                      onChange={(e) => handleFormSpace(e)}
                      required
                      defaultChecked={
                        space === state.subscriptionParameters.space
                      }
                    />
                    <label htmlFor="duration">{space} gb</label>
                  </div>
                );
              })}
              <p>Upfront payment?</p>
              {booleanUpfrontPayment.map((boolean, index) => {
                return (
                  <div key={index}>
                    <input
                      type="radio"
                      value={boolean}
                      name="upfrontPayment"
                      onChange={handleFormChange}
                      required
                      defaultChecked={
                        boolean === state.subscriptionParameters.upfrontPayment
                      }
                    />
                    <label htmlFor="upfrontPayment">
                      {boolean === "true" ? "Yes" : "No"}
                    </label>
                  </div>
                );
              })}
              <div className="page__footer">
                <button type="submit">Next</button>
              </div>
            </form>
            <OrderStatus />
          </div>
        </section>
      )}
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
    </div>
  );
};

export default SubscriptionParameters;
