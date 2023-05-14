import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: sessionStorage.getItem('token') },
  reducers: {
    signIn: (state, action) => {
      sessionStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
    },
    logout: () => {
      sessionStorage.setItem('token', '');
    },
  },
});

export const { signIn, logout } = authSlice.actions;

export default authSlice.reducer;
