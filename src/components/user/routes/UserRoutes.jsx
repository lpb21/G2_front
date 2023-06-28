import { Route, Routes } from 'react-router-dom'
import { Login } from '../Login'

export const UserRoutes = () => {
  

  return (
    <Routes>
      <Route path='user'>
        <Route
          path="login"
          element={<Login />}
        />
        <Route path="*" element={<Login />} />
      </Route>
    </Routes>
  )
}