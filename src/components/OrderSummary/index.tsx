import React, { useContext } from "react";
import { AppContext } from "../../globalState/context";

const OrderSummary: React.FC = () => {
  const { state } = useContext(AppContext);

  const { duration, space, pricePerGigabyte } = state.subscriptionParameters;

  return (
    <div className="order-status__container">
      <div>
        <h3>Order Summary</h3>
      </div>
      <div className="order-status__body">
        <p>Duration selected: {duration} Months</p>
        <p>Space selected: {space} gb</p>
        <p>Price per gb: USD {pricePerGigabyte}</p>
        <p>Total Price: USD {duration * space * pricePerGigabyte}</p>
      </div>
    </div>
  );
};
export default OrderSummary;
