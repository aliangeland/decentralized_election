import React, { createContext, useReducer } from "react";
import AdminReducer from "../reducers/AdminReducer";

const initialState = {
  candidates: [],
};

const AdminContext = createContext(initialState);

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const addCandidate = (candidate) => {
    dispatch({
      type: "ADD_CANDIDATE",
      payload: candidate,
    });
  };

  const editCandidate = (candidate) => {
    dispatch({
      type: "EDIT_CANDIDATE",
      payload: candidate,
    });
  };

  const deleteCandidate = (id) => {
    dispatch({
      type: "DELETE_CANDIDATE",
      payload: id,
    });
  };

  return (
    <AdminContext.Provider
      value={{
        candidates: state.candidates,
        addCandidate,
        editCandidate,
        deleteCandidate,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
