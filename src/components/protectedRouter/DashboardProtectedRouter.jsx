import React from 'react'
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router';

export default function DashboardProtectedRouter({children}) {
    const token = localStorage.getItem("userToken");
       if(! token) return <Navigate to="/login" />
     {/*فك تشفير التوكن*/}
    const decodedToken = jwtDecode(token);
     const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const role = decodedToken[roleClaim];
    console.log(role);
        if(role != 'SuperAdmin'){
          return <Navigate to="/UnAuthorized" />;
        }
    return children ;
  
}
