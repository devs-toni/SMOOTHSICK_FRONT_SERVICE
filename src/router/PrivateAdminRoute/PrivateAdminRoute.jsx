import { Navigate } from 'react-router'
import { useAuthContext } from '../../context/AuthContext'
import { useEffect, useState } from 'react';

export const PrivateAdminRoute = ({ children }) => {
  const { authState } = useAuthContext();
  const [adminRole, setAdminRole] = useState(false);

  useEffect(() => {
    try {
      axios.post(import.meta.env.VITE_DB_URI_AUTHORIZATE, { user })
        .then((res) => setAdminRole(res.data))
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (authState.isAuthenticated && adminRole) ? children : <Navigate to="/" />
}