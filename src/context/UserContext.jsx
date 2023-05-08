import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { useAuth } from "./AuthContext";
import { TYPES } from "./types";
import axios from "axios";

const userContext = createContext();
export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = ({ children }) => {

  const { authState } = useAuth();

  const getFavourites = useCallback(() => {
    axios.get(import.meta.env.VITE_BACKEND + 'users/favourites', {
      headers: {
        "Authorization": `${authState.token}`
      }
    })
      .then(({ data }) => {
        dispatch({ type: TYPES.SET_FAVOURITES, payload: data })
      })
  }, [authState.token]);

  useEffect(() => {
    if (authState.token) getFavourites();
  }, [authState.token])


  const initialState = {
    lists: [],
    favourites: [],
  }

  const reducer = (state, action) => {
    switch (action.type) {

      case TYPES.SET_LISTS:
        return {
          ...state,
          lists: action.payload
        }
      case TYPES.SET_FAVOURITES:
        return {
          ...state,
          favourites: action.payload
        }

      default:
        return state
    }
  }

  const [userState, dispatch] = useReducer(reducer, initialState);

  const removeFromFavourites = useCallback((trackId) => {
    const filteredTracks = userState.favourites.filter(t => t.id !== trackId);
    dispatch({ type: TYPES.SET_FAVOURITES, payload: filteredTracks })
  }, [userState.favourites]);


  const data = useMemo(() => ({
    userState,
    getFavourites,
    removeFromFavourites,
  }), [userState, getFavourites, removeFromFavourites]);

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};
