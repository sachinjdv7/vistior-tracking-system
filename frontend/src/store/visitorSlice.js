import { createSlice } from "@reduxjs/toolkit";

const visitorSlice = createSlice({
  name: "visitor",
  initialState: null,
  reducers: {
    addVisitorList: (state, action) => {
      return action.payload;
    },
  },
});

export const { addVisitorList } = visitorSlice.actions;

export default visitorSlice.reducer;
