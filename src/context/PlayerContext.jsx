import { useReducer } from "react";
import { useContext, createContext } from "react";
import { useMemo } from "react";

const PlayerContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
}

export const PlayerProvider = ({ children }) => {

  const initialState = {}

  const reducer = (state, action) => {

    switch (action.type) {

      default:
        return state;
    }
  }

  const [playerState, dispatch] = useReducer(reducer, initialState);

  const data = useMemo(() => ({
    playerState
  }), [playerState]);

  return (
    <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
  )
}
