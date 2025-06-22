import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: !!localStorage.getItem("login"), // Set initial state based on localStorage
};

export const LoginActionSlicer = createSlice({
  name: "room",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.login = true;
      localStorage.setItem("login", "true");
      if (action.payload?.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },
    logoutUser: (state) => {
      state.login = false;
      localStorage.removeItem("login");
      localStorage.removeItem("token");
    },
  },
});

export const { loginUser, logoutUser } = LoginActionSlicer.actions;
export default LoginActionSlicer.reducer;
