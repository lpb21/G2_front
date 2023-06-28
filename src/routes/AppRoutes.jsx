import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../components/user/Login"
import { PrivateRoutes } from "./PrivateRoutes"
import { BiRoutes } from "../components/BI/routes/BiRoutes"
import { useEffect } from "react"
import { PublicRoutes } from "./PublicRoutes"

export const AppRoutes = () => {

  const NotFound = () => {
    return (
      <>
        <h1>403</h1>
      </>
    )
  }

  useEffect(() => {
    
  },[])
  
  return(
    <Routes>
      {/* Rutas Publicas */}

      <Route path="/" element={
        <PublicRoutes>
          <Login />
        </PublicRoutes>
      }/>
      {/* Rutas Privadas */}
      <Route path="/*" 
        element={
          <PrivateRoutes> 
            <BiRoutes/>
          </PrivateRoutes>
        }
      />
    </Routes>
  )
}