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

  const getMyTracks = useCallback(() => {
    axios.get(import.meta.env.VITE_BACKEND + "tracks/my", { headers: { "Authorization": authState.token } })
      .then(({ data }) => {
        dispatch({ type: TYPES.SET_MY_TRACKS, payload: data })
      })
  }, [authState.token]);

  const toggleLike = (type, data, isLike, setIsLike) => {
    axios.patch(import.meta.env.VITE_BACKEND + type.toLowerCase() + "/like/" + data.id, {}, {
      headers: {
        "Authorization": `${authState.token}`
      }
    }).then(() => {
      if (isLike) {
        setIsLike(false)
        removeFromFavourites(data.id)
      } else
        setIsLike(true)
    })
  }

  useEffect(() => {
    if (authState.token && authState.isAuthenticated) {
      getFavourites();
      getMyTracks();
    }
  }, [authState.token, authState.isAuthenticated])

  useEffect(() => {
    if (!authState.isAuthenticated) {
      dispatch({ type: TYPES.DELETE_FAVOURITES })
    };
  }, [authState.isAuthenticated])


  const initialState = {
    lists: [],
    favourites: [],
    myTracks: []
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
      case TYPES.DELETE_FAVOURITES:
        return {
          ...state,
          favourites: []
        }
      case TYPES.SET_MY_TRACKS:
        return {
          ...state,
          myTracks: action.payload
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

  const removeFromMyTracks = useCallback((trackId) => {
    const filteredTracks = userState.myTracks.filter(t => t.id !== trackId);
    dispatch({ type: TYPES.SET_MY_TRACKS, payload: filteredTracks })
  }, [userState.myTracks]);
  
  const data = useMemo(() => ({
    userState,
    getFavourites,
    getMyTracks,
    removeFromFavourites,
    removeFromMyTracks,
    toggleLike
  }), [userState, getFavourites, removeFromFavourites, toggleLike, removeFromMyTracks, getMyTracks]);

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};
