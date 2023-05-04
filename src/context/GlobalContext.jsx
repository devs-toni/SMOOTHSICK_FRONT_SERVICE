import { useContext, createContext, useReducer, useMemo, useEffect } from "react"
import { TYPES } from "./types";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export const GlobalProvider = ({ children }) => {


  const initialState = {
    users: [],
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case TYPES.LOAD_USERS:
        return {
          ...state,
          tracks: action.payload
        }

      default: return state
    }
  }

  const [dataState, dispatch] = useReducer(reducer, initialState)

  const globalData = useMemo(() => ({
    dataState
  }), [dataState]);


  return (
    <GlobalContext.Provider value={globalData}>
      {children}
    </GlobalContext.Provider>
  )
}