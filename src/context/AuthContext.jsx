import { createContext, useContext, useReducer, useCallback, useMemo } from "react";
import { TYPES } from "./types";
import defaultUserPicture from "../assets/imgs/default_pictures/default_user_img.png"

const init = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  return {
    isAuthenticated: !!auth,
    id: auth ? auth.id : -1,
    user: auth ? auth : {},
    error: ""
  }
}

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    firstTime: false,
    id: -1,
    user: {
      id: -1,
      firstName: "",
      lastName: "",
      email: "",
      profilePicture: defaultUserPicture,
    },
    error: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case TYPES.LOGIN_SUCCESS:
        return {
          isAuthenticated: true,
          id: action.payload.id,
          user: action.payload.user,
          firstTime: true,
          error: ""
        };
      case TYPES.LOGIN_UNSUCCESS:
        return {
          ...state,
          error: action.payload.error,
        };
      case TYPES.LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          id: "",
          user: initialState.user,
        };
      case TYPES.RESET_ERROR:
        return {
          ...state,
          error: "",
        };

      case TYPES.SET_FIRST_TIME_FALSE:
        return {
          ...state,
          firstTime: false
        }
      default:
        return state;
    }
  };

  const [authState, dispatch] = useReducer(reducer, initialState, init);

  const login = useCallback((id, user, error) => {
    if (!error) {
      dispatch({ type: TYPES.LOGIN_SUCCESS, payload: { id, user } })
      localStorage.setItem('auth', JSON.stringify(user));
    } else
      dispatch({ type: TYPES.LOGIN_ERROR, payload: error })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('auth');
    dispatch({ type: TYPES.LOGOUT })
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: TYPES.RESET_ERROR })
  }, [])

  const resetFirstTime = useCallback(() => {
    dispatch({ type: TYPES.SET_FIRST_TIME_FALSE })
  }, [])

  const authData = useMemo(() => ({
    authState,
    login,
    logout,
    reset,
    resetFirstTime
  }), [authState, login, logout, reset, resetFirstTime]);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
