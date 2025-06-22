import { configureStore } from "@reduxjs/toolkit";
import RoomActionSlicer from "./feature/RoomActionSlicer";
import LoginReducer from "./feature/LoginActionSlicer";
export const store = configureStore({
  reducer: {
    login: LoginReducer,
    room: RoomActionSlicer,
  },
});
