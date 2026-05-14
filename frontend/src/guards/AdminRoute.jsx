import { useState, useEffect } from "react"
import { Navigate } from "react-router"
import { useAuth } from "@/context/AuthContext"
import api from "@/lib/api"

// admin route protection
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const [verified, setVerified] = useState(null)

  useEffect(() => {
    if (loading) return
    if (!user) { setVerified(false); return }

    const verify = async () => {
      try {
        await api.get("/auth/adminverify")
        setVerified(true)
      } catch {
        setVerified(false)
      }
    }

    verify()
  }, [user, loading])

  if (loading || verified === null) return null

  return verified ? children : <Navigate to="/" replace />
}

export default AdminRoute