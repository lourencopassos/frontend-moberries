import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Confirmation from "../pages/Confirmation";
import PaymentData from "../pages/PaymentData";
import StartPage from "../pages/Start";
import SubscriptionParameters from "../pages/SubscriptionParameters";
import Sucess from "../pages/Sucess";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={StartPage} exact path="/" />
        <Route
          component={SubscriptionParameters}
          exact
          path="/subscription-parameters"
        />
        <Route component={PaymentData} exact path="/payment-data" />
        <Route component={Confirmation} exact path="/order-confirmation" />
        <Route component={Sucess} exact path="/sucess" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
