import { useEffect } from "react"
import { Content } from "../components/content/Content"
import { useState } from "react"
import { Navigate } from "react-router-dom"

export const PrivateRoutes = ({children}) => {
  // validar Login
  const [routesValid , setroutesValid] = useState(!!localStorage.getItem('logged'))
  

  useEffect(() => {
  },[])

  return (routesValid) ? <>
      <Content >
        {children}
      </Content>
    </> : <Navigate to="/"/>
  
}