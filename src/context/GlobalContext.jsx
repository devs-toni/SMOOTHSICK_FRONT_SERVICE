import { useContext, createContext, useReducer, useMemo, useEffect } from "react"
import { TYPES } from "./types";
import { useFetchAllAlbums, useFetchAllPlaylists, useFetchAllArtists } from "../hooks";


const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export const GlobalProvider = ({ children }) => {

  const { albums, albumsLoaded } = useFetchAllAlbums();
  const { artists, artistsLoaded } = useFetchAllArtists();
  const { playlists, playlistsLoaded } = useFetchAllPlaylists();

  useEffect(() => {
    albumsLoaded && dispatch({ type: TYPES.LOAD_ALBUMS, payload: albums })
  }, [albumsLoaded])
  useEffect(() => {
    artistsLoaded && dispatch({ type: TYPES.LOAD_ARTISTS, payload: artists })
  }, [artistsLoaded])
  useEffect(() => {
    playlistsLoaded && dispatch({ type: TYPES.LOAD_PLAYLISTS, payload: playlists })
  }, [playlistsLoaded])


  const initialState = {
    playlists: [],
    users: [],
    albums: [],
    artists: [],
  }


  const reducer = (state, action) => {
    switch (action.type) {

      case TYPES.LOAD_PLAYLISTS:
        return {
          ...state,
          playlists: action.payload
        }

      case TYPES.LOAD_USERS:
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