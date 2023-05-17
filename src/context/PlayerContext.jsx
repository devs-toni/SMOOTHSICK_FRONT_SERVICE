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
    current: {},
    queue: [], 
    list: [], 
    isListening: false
  }


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
      case TYPES.SET_IS_LISTENING:
        return {
          ...state,
          isListening: action.payload
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

  const setIsListening = useCallback((state) => {
    dispatch({ type: TYPES.SET_IS_LISTENING, payload: state })
  }, [])


  const data = useMemo(() => ({
    playerState,
    addSong,
    playSong,
    addList,
    addQueue,
    setIsListening
  }), [playerState, setIsListening, addSong, playSong, addList, addQueue]);

  return (
    <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
  )
}
