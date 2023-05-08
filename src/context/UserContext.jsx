import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const userContext = createContext();
export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = ({ children }) => {
  const [userLists, setUserLists] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const { authState } = useAuth();

  useEffect(() => {

  }, [authState.isAuthenticated]);

  const data = useMemo(() => ({
    userLists,
  }), [userLists]);

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};
