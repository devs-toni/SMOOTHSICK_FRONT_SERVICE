import { useContext, createContext, useReducer, useMemo, useEffect } from "react"
import { TYPES } from "./types";
import axios from "axios";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export const GlobalProvider = ({ children }) => {


  const initialState = {
    users: [],
  }

  useEffect(() => {
    const fetchUsers = async () => {
      axios.get(import.meta.env.VITE_BACKEND + 'users')
        .then(({ data }) => {
          console.log(data);
        })
    }
    fetchUsers();
  }, [])


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