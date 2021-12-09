import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  date: moment().toDate(),
  view: "week",
  views: ["month", "week", "day", "agenda"],
  visible: false,
};

export const toolbarSlice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    setDate: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.date = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    toggleVisible: (state) => {
      state.visible = !state.visible;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDate, setView, toggleVisible } = toolbarSlice.actions;

export default toolbarSlice.reducer;
