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
    current: null,
    queue: []
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

      default:
        return state;
    }
  }

  const [playerState, dispatch] = useReducer(reducer, initialState);

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
    playSong
  }), [playerState, addSong, playSong]);

  return (
    <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
  )
}
