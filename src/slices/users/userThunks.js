import { instanceAxios } from "../../axios"
import { changeLogged } from "./userSlice"


export const loggedUsers = (users = {}) => {
  return async (dispatch) => {
    try { 
      const response = await instanceAxios.post('/v1/getUsers', {
        ...users
      })
      //logged ok
      dispatch(changeLogged(true))
    } catch({response}) {
      dispatch(changeLogged(false))
      const { mns = 'Error no Identificado'} = response?.data
      toastr.error(mns) // eslint-disable-line
    }
  }
}