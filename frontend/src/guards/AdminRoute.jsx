// import { Navigate } from "react-router";


// const AdminRoute=({children})=>{

//     const user=JSON.parse(localStorage.getItem('user') || null)
//     if( !user || user.role!=='admin'){
//         return <Navigate to="/" replace/>
//     }
// return children
// }
// export default AdminRoute
// !todo: better the admin route by getting the role from api for admin verfication
import {useState,useEffect} from 'react'
import { Navigate } from 'react-router'
import axios from 'axios'

const AdminRoute=({children})=>{
    const [isAdmin,setIsAdmin]=useState(null);
    
    useEffect(()=>{
        const verify=async()=>{

                const token = localStorage.getItem('token');

    if (!token) {
      setIsAdmin(false);
      return;
    }
        try{
            const res=await axios.get('/auth/adminverify',{
                 headers: { Authorization: `Bearer ${token}` }
            })
            console.log(res,"response");
            if(res.status==200 ){
            setIsAdmin(true);

             }
             else{
            setIsAdmin(false);

             }
        }catch{

            setIsAdmin(false);
        }
    }
    verify();
    },[])
 
    if( isAdmin ===null){
        return <div>Loading...</div>
    }

 if (!isAdmin) return <Navigate to="/" replace />;
 return children;
}
export default AdminRoute
