import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    logged: false    
  },
  reducers: {
    changeLogged: ( state, {payload}) => {
      state.logged = payload
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  changeLogged
} = userSlice.actions
