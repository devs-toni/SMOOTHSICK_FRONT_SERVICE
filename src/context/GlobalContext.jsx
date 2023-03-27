import { useContext, createContext, useReducer, useMemo } from "react"
import db from "../api/db.json"

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
    genres: db.genres
  }

  const reducer = (state, action) => {
    return state
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
