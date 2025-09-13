import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashBoardOpen: true,
  createRoom: false,
  joinRoom: false,
  roomList: [],
};

export const RoomActionSlicer = createSlice({
  name: "room",
  initialState,
  reducers: {
    toggle(state, action) {
      state.dashBoardOpen = !state.dashBoardOpen;
    },
    createRoom(state, action) {
      state.createRoom = action.payload;
    },
    joinRoom(state, action) {
      state.joinRoom = action.payload;
    },
    addRoom(state, action) {
      state.roomList.push(action.payload);
    },
   
  },
});

// Action creators are generated for each case reducer function
export const { toggle, createRoom, joinRoom, addRoom} =
  RoomActionSlicer.actions;

export default RoomActionSlicer.reducer;
