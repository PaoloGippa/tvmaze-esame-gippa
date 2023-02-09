import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TodoType = {
  label: string;
  completed: boolean;
};

export type TodoStateType = {
  todos: TodoType[];
  archived?: TodoType[];
};

const initialState: TodoStateType = {
  todos: [],
  archived: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<TodoType>) => {
      state.todos.push(action.payload);
    },
    completed: (state, action: PayloadAction<TodoType>) => {
      state.todos.forEach((todo) => {
        if (todo.label === action.payload.label) {
          todo.completed = !todo.completed;
        }
      });
    },
    archived: (state, action: PayloadAction<number>) => {
      if (state.todos[action.payload].completed === true) {
        //state.todos è l'array, action.payload è l'index
        state.archived?.push(state.todos[action.payload]); //cosi pusho dentro all'archivio
        state.todos.splice(action.payload, 1); //tolgo la prim istanza nell'array todo
      }
    },
  },
});

export const { add, completed, archived } = todoSlice.actions;
export default todoSlice.reducer;
