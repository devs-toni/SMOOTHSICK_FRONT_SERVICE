import { createContext, useReducer } from "react";
import { TYPES } from "./types";

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

  const [authState, dispatch] = useReducer(reducer, initialState);

  const authData = {
    authState,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
