import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: sessionStorage.getItem('token') },
  reducers: {
    signIn: (state, action) => {
      sessionStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
    },
    logOut: (state) => {
      sessionStorage.setItem('token', null);
    },
  },
});

export const { signIn, logOut } = authSlice.actions;

export default authSlice.reducer;
