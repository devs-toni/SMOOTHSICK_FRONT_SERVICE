import { Navigate } from 'react-router'

const PrivateRoute = ({children}) => {
    const {authState} = useAuthContext()
    return authState.isAuthenticated ? children : <Navigate to = "/" />
}

export default PrivateRoute