import { useContext, createContext, useReducer, useMemo, } from "react"
import { TYPES } from "./types"

const RecoveryContext = createContext()

export const useRecoveryContext = () => {
    return useContext(RecoveryContext)
}


export const RecoveryProvider = ({ children }) => {
    const initialState = {
        userId: "",
        token: ""
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case TYPES.SET_USER_ID:
                return {
                    ...state,
                    user: action.payload
                }
            case TYPES.SET_TOKEN:
                return {
                    ...state,
                    token: action.payload
                }
            default:
                return state
        }
    }

    const [dataState, dispatch] = useReducer(reducer, initialState)
    const userUrlParams = useMemo(() => ({
        dataState
    }), [dataState])

    return (
        <RecoveryContext.Provider value={userUrlParams}>
            {children}
        </RecoveryContext.Provider>
    )
}