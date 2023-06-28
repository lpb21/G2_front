import { configureStore } from '@reduxjs/toolkit'
import   {userSlice, wosSlice} from '../slices'

export const store = configureStore({
  reducer: {
    bi_wos: wosSlice.reducer,
    user: userSlice.reducer
  },
})