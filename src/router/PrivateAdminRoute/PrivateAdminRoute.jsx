import { Navigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'

export const PrivateAdminRoute = ({ children }) => {
  const { authState } = useAuth();

  return (authState.isAuthenticated && authState.user.role === "A") ? children : <Navigate to="/" />
}