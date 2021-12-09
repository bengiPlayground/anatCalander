import { configureStore } from "@reduxjs/toolkit";
import toolbarSlice from "./features/toolbarSlice";

export const store = configureStore({
  reducer: {
    toolbar: toolbarSlice,
  },
});
