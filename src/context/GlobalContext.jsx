import { useContext, createContext, useReducer } from "react"
import db from "../api/db.json"
import { TYPES } from "./types"
const GlobalContext = createContext()

 

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export const GlobalProvider = ({ children }) => {

    const initialState = {
        playlists: db.playlists,
        tracks: db.tracks,
        users: db.users,
        albums: db.albums,
        artists: db.artists,
        genres: db.genres
    }
    const reducer = (state, action) => {
        

        return state
    }

    const [dataState, dispatch] = useReducer(reducer, initialState)

    
    const globalData = {
        dataState
    }


    return (
        <GlobalContext.Provider value={globalData}>
            {children}
        </GlobalContext.Provider>
    )
}
