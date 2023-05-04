import { useContext, createContext, useReducer, useMemo, useEffect } from "react"
import db from "../api/db.json"
import { useFetchAllArtists } from "../hooks/useFetchAllArtists";
import { TYPES } from "./types";
import { useFetchAllTracks } from "../hooks/useFetchAllTracks";
import { useFetchAllPlaylists } from "../hooks/useFetchAllPlaylists";
import { useFetchAllAlbums } from "../hooks/useFetchAllAlbums";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export const GlobalProvider = ({ children }) => {

  const initialState = {
    playlists: db.playlists,
    tracks: db.tracks,
    users: db.users,
    albums: db.albums,
    artists: db.artists,
    //genres: db.genres
  }


  const reducer = (state, action) => {
    switch (action.type) {

      case TYPES.LOAD_PLAYLISTS:
        return {
          ...state,
          playlists: action.payload
        }

      case TYPES.LOAD_TRACKS:
        return {
          ...state,
          tracks: action.payload
        }

      case TYPES.LOAD_ALBUMS:
        return {
          ...state,
          albums: action.payload
        }

      case TYPES.LOAD_ARTISTS:
        return {
          ...state,
          artists: action.payload
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
