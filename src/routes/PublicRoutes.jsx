import { useEffect } from "react"
import { useState } from "react"
import { Navigate } from "react-router-dom"

export const PublicRoutes = ({children}) => {
  // validar Login
  const [routesValid , setroutesValid] = useState(!!localStorage.getItem('logged'))

  useEffect(() => {
      
  },[])

  return (!!routesValid) ? <Navigate to="/bi"/> :   children;
}