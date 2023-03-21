import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useGlobalContext } from "./GlobalContext";



const userContext = createContext()
export const useUser = () => {
    return useContext(userContext)
}



export const UserProvider = ({ children }) => {



    const [userLists, setUserLists] = useState("");

    const { authState } = useAuthContext();

    // const { user, isAuthenticated } = authState;

    const [currentUser, setCurrentUser] = useState({})

    const { dataState } = useGlobalContext();



    useEffect(() => {
        console.log("imprimete");
        if (authState.isAuthenticated) {
            const userFinded = dataState.users.find((e) => authState.user.id === e.id)
            setCurrentUser(userFinded)
            setUserLists(userFinded.user_lists)
        }

    }, [authState.user])







    const data = {
        userLists
    }

    return (
        <userContext.Provider value={data}>{children}</userContext.Provider>
    )
}

