import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./feat";

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
export default store;
