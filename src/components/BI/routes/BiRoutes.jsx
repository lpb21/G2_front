import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {ChannelPSI} from '../pages/channelPSI'

export const BiRoutes = () => {
  
  const HomeBi = () => {
    return (
      <p>403</p>
    )
  }
  const HomeBiParams = () => {
    return (
      <p>403 con params</p>
    )
  }

  return (
    <Routes>
      <Route path="bi">
        <Route path='cpsi' element={<ChannelPSI />} />
        <Route path=':params' element={<HomeBiParams />} />
      </Route> 
      <Route path="*" element={<HomeBi />} />      
    </Routes>
  )
}
