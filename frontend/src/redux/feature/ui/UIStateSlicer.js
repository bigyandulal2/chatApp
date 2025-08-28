import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isExpanded:false
}

export const UIStateActionSlicer=createSlice({
    name:"uistate",
    initialState,
    reducers:{
        toggle:(state,action)=>{
            state.isExpanded=!state.isExpanded
        }

    }
})
export const { toggle } = UIStateActionSlicer.actions;
export default UIStateActionSlicer.reducer;