import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: false, //sarebbe state//
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme; //negazione: da light passa a dark//
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
