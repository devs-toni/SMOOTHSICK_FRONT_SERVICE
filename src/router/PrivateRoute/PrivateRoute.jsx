import { Navigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'

export const PrivateRoute = ({children}) => {
  const { authState } = useAuth()
    return authState.isAuthenticated ? children : <Navigate to = "/" />
}
