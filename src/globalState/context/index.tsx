import React, { createContext, Dispatch, useReducer } from "react";
import { Order } from "../../types";
import { initialState, reducer } from "../reducer";
import { OrderActions } from "../types";

export const AppContext = createContext<{
  state: Order;
  dispatch: Dispatch<OrderActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
