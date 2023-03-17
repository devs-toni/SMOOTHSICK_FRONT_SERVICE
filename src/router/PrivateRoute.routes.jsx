import { Navigate } from 'react-router'
import { useAuthContext } from '../context/AuthContext'

const PrivateRoute = ({children}) => {
    const {authState} = useAuthContext()
    return authState.isAuthenticated ? children : <Navigate to = "/" />
}

export default PrivateRoute