import { configureStore } from "@reduxjs/toolkit";
import RoomActionSlicer from "./feature/RoomActionSlicer";
import LoginReducer from "./feature/LoginActionSlicer";
import socketReducer from "./feature/socket/SocketActionSlicer";
export const store = configureStore({
  reducer: {
    login: LoginReducer,
    room: RoomActionSlicer,
    socket: socketReducer,
  },
});
