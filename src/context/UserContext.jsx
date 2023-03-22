import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useGlobalContext } from "./GlobalContext";

const userContext = createContext();
export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = ({ children }) => {
  const [userLists, setUserLists] = useState([]);

  const { authState } = useAuthContext();

  const [currentUser, setCurrentUser] = useState({});

  const { dataState } = useGlobalContext();

  useEffect(() => {
    if (authState.isAuthenticated) {
      const userFinded = dataState.users.find(
        (e) => authState.user.id === e.id
      );
      if (userFinded) {
        setCurrentUser(userFinded);
        setUserLists(userFinded.user_lists);
      }
    } else {
        setUserLists([])
        setCurrentUser({});
    }
  }, [authState.isAuthenticated]);

  const data = {
    userLists,
  };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};
