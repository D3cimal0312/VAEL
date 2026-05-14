import { Navigate } from "react-router"
import { useAuth } from "@/context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/auth/register" replace />
}

export default ProtectedRoute