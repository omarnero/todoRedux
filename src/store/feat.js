import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.title !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((item) =>
        item.id === action.payload.id ? { ...action.payload } : item
      );
    },
    updateState: (state, action) => {
      console.log(action.payload);
      state.todos = state.todos.map((item) =>
        item.id === action.payload.id
          ? { ...item, state: action.payload.state }
          : item
      );
    },
  },
});

export default todoSlice.reducer;
export const todoAction = todoSlice.actions;
