import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages:[],
  imgFile:null
};

export const ChatActionSlicer = createSlice({
  name: "chat",
  initialState,
  reducers: {
     sendMessage:(state,action)=>{
       state.messages.push(action.payload);
     }
  },
});

// Action creators are generated for each case reducer function
export const { sendMessage } =
  ChatActionSlicer.actions;

export default ChatActionSlicer.reducer;
