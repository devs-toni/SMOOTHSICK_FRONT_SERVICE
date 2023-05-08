import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { useAuth } from "./AuthContext";
import { TYPES } from "./types";

const userContext = createContext();
export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = ({ children }) => {


  const initialState = {
    lists: [],
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case TYPES.SET_LISTS:
        return {
          ...state,
          lists: action.payload
        }

      default:
        return state
    }
  }

  const [userState, dispatch] = useReducer(reducer, initialState)

  const data = useMemo(() => ({
    lists: userState.lists,
  }), [userState.lists]);

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};
