import React, { createContext, useReducer } from "react";

import appReducer from "../reducers/appReducer";

const initialState = {
  contract: {},
  account: "",
  isVoted: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function setContract(contract) {
    dispatch({
      type: "SET_CONTRACT",
      payload: contract,
    });
  }
  function setAccount(account) {
    dispatch({
      type: "SET_ACCOUNT",
      payload: account,
    });
  }
  function setVoted(voterIsVoted) {
    dispatch({
      type: "SET_VOTED",
      payload: voterIsVoted,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        account: state.account,
        contract: state.contract,
        isVoted: state.isVoted,
        setContract,
        setAccount,
        setVoted,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
