import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../../api/models/user.interface';

interface Auth {
  accessToken?: string;
  user?: IUser
}
const initialState: Auth = {
  accessToken: localStorage.getItem('token') || undefined,
  user: JSON.parse(localStorage.getItem('user') || '{}')
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      if (action.payload.accessToken) {
        localStorage.setItem('token', action.payload.accessToken)
        state.accessToken = action.payload.accessToken
      }
      if (action.payload.user) {
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        state.user = action.payload.user
      }

    },
    logout: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      state.accessToken = undefined
      state.user = undefined
    }
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer