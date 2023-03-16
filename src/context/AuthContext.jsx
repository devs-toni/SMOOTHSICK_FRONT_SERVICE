import { createContext, useContext, useReducer, useCallback } from "react";
import { TYPES } from "./types";

const init = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  return  {
    isAuthenticated:!!auth,
      auth 
  }
}

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    id:-1,
    user: {
      firstName: "",
      lastName: "",
      email: "",
      profilePicture: "",
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
          error: "",
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

      default:
        return state;
    }
  };

  const [authState, dispatch] = useReducer(reducer, initialState, init);

  const login = useCallback((id, user, error) => {
    if (!error) {
      dispatch({ type: TYPES.LOGIN_SUCCESS, payload: { id, user } })
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, id, user }));
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



  const authData = {
    authState,
    login, 
    logout,
    reset
    

  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
