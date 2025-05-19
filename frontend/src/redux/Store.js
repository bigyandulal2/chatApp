import { configureStore } from "@reduxjs/toolkit";
import RoomActionSlicer from "./feature/RoomActionSlicer";

export const store = configureStore({
  reducer: {
    room: RoomActionSlicer,
  },
});
