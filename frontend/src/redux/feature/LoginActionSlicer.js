import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: !!localStorage.getItem("login"),
  user:localStorage.getItem("user"),
  userId:localStorage.getItem("userId")
  // Set initial state based on localStorage
};

export const LoginActionSlicer = createSlice({
  name: "room",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.login = true;
      localStorage.setItem("login", "true");
      // console.log("data here from slicer", action.payload);

      const { token, name,_id } = action.payload;
      console.log("from data slcier", token, name);

      if (token && name) {
        localStorage.setItem("userId",_id);
        localStorage.setItem("token", token);
        localStorage.setItem("user", name);
      }
    },
    logoutUser: (state) => {
      state.login = false;
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      localStorage.removeItem("login");
      localStorage.removeItem("token");
    },
  },
});

export const { loginUser, logoutUser } = LoginActionSlicer.actions;
export default LoginActionSlicer.reducer;
