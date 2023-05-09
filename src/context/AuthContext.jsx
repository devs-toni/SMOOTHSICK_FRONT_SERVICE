import { createContext, useContext, useReducer, useCallback, useMemo, useLayoutEffect, useEffect, useState } from "react";
import { TYPES } from "./types";
import defaultUserPicture from "../assets/imgs/default_pictures/default_user_img.png"
import axios from "axios";

const token = localStorage.getItem('userToken') || undefined;


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (token) {
          axios.post(import.meta.env.VITE_BACKEND + "users/userData", {}, {
            headers: {
              "Authorization": token
            }
          })
            .then(res => {
              const { data, status } = res
              if (status === 200) {
                refresh(data.id, {
                  id: data.id,
                  firstName: data.name,
                  lastName: data.last_name,
                  email: data.email,
                  role: data.role,
                  userName: data.user_name,
                  profilePicture: defaultUserPicture,
                });
              }
            })
        }
      } catch (error) {
        console.error(error)
      }
    }
    checkUser();
  }, [])



  const initialState = {
    isAuthenticated: token ? true : false,
    firstTime: false,
    id: -1,
    user: {
      id: -1,
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      profilePicture: defaultUserPicture,
    },
    token: "",
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
          token: action.payload.token,
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
          user: "",
          token: "",
          error: "",
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
        };

      case TYPES.REFRESH_PAGE:
        return {
          isAuthenticated: true,
          id: action.payload.id,
          user: action.payload.user,
          firstTime: true,
          token: action.payload.token,
        };



      default:
        return state;
    }
  };

  const [authState, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = useCallback((id, user, error) => {
    if (!error) {
      dispatch({ type: TYPES.LOGIN_SUCCESS, payload: { id, user, token } })
    } else
      dispatch({ type: TYPES.LOGIN_ERROR, payload: error })
  }, [token])

  const refresh = useCallback((id, user, error) => {
    if (!error) {
      dispatch({ type: TYPES.REFRESH_PAGE, payload: { id, user, token } })
    } else
      dispatch({ type: TYPES.LOGIN_ERROR, payload: error })
  }, [token])

  const logout = useCallback(() => {
    localStorage.removeItem('userToken');
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
    refresh,
    login,
    logout,
    reset,
    resetFirstTime
  }), [authState, login, logout, reset, resetFirstTime]);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};
