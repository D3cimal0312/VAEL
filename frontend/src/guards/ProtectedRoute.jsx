import { Navigate } from "react-router";

const ProtectedRoute=({children})=>{
    const token= localStorage.getItem('token')
    if(!token) return <Navigate to='/auth/register' replace/>
    return children
}


export default ProtectedRoute