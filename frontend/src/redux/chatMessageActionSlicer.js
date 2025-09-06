import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  recipient: "everyone",
  userId:localStorage.getItem("userId"),
  usersInRoom:[]
};

export const ChatMessageActionSlicer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setRecipient: (state, action) => {
      state.recipient = action.payload;
    },
    setUsersInRoom:(state,action)=>{
      state.usersInRoom=action.payload;
    }
  },
});

// ✅ Export actions
export const { sendMessage, setRecipient,setUsersInRoom } = ChatMessageActionSlicer.actions;

// ✅ Export reducer
export default ChatMessageActionSlicer.reducer;
