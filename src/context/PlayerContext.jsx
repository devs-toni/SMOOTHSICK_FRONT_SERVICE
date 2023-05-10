import { useCallback, useReducer } from "react";
import { useContext, createContext } from "react";
import { useMemo } from "react";
import { TYPES } from "./types";

const PlayerContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
}

export const PlayerProvider = ({ children }) => {

  const initialState = {
    current: {}, //1ºPRIORIDAD
    queue: [], //2ºPRIORIDAD
    list: [] //ULTIMA 3º PRIORIDAD
  }

  // SI PULSAMOS UN TRACK EN LIBRE --- SETEAMOS LA 3º PRIORIDAD EN LIST --- LAS CANCIONES QUE NOS DE LA GANA
  // SI PULSAMOS UN TRACK O MIX EN PLAYLISTS O ALBUMS --- SETEAMOS LA 2º PRIORIDAD EN QUEUE --- LAS CANCIONES SIGUIENTES DE DICHO ALBUM O PLAYLIST

  const reducer = (state, action) => {

    switch (action.type) {
      case TYPES.PLAY_SONG:
        return {
          ...state,
          current: action.payload
        }
      case TYPES.ADD_SONG:
        return {
          ...state,
          queue: [...queue, action.payload]
        }
      case TYPES.ADD_TRACKS_TO_LIST:
        return {
          ...state,
          list: action.payload
        }
      case TYPES.ADD_TRACKS_TO_QUEUE:
        return {
          ...state,
          queue: action.payload
        }
      default:
        return state;
    }
  }

  const [playerState, dispatch] = useReducer(reducer, initialState);

  const addList = useCallback((list) => {
    dispatch({ type: TYPES.ADD_TRACKS_TO_LIST, payload: list })
  }, [])

  const addQueue = useCallback((list) => {
    dispatch({ type: TYPES.ADD_TRACKS_TO_QUEUE, payload: list })
  }, [])

  const playSong = useCallback((mp3) => {
    dispatch({ type: TYPES.PLAY_SONG, payload: mp3 })
  }, [])

  const addSong = useCallback((mp3) => {
    !playerState.queue.includes(mp3) &&
      dispatch({ type: TYPES.ADD_SONG, payload: mp3 })
  }, [])


  const data = useMemo(() => ({
    playerState,
    addSong,
    playSong,
    addList,
    addQueue
  }), [playerState, addSong, playSong, addList, addQueue]);

  return (
    <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
  )
}
