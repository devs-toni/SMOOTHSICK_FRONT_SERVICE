import { Navigate } from 'react-router'
import { useAuthContext } from '../../context/AuthContext'

export const PrivateAdminRoute = ({ children }) => {
  const { authState } = useAuthContext();

  return (authState.isAuthenticated && authState.user.role === "A") ? children : <Navigate to="/" />
}