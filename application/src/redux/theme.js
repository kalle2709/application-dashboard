import { createSlice } from "@reduxjs/toolkit";

const loadThemeState = () => {
  const savedTheme = localStorage.getItem("darkMode");
  return savedTheme ? JSON.parse(savedTheme) : false;
};


const saveThemeState = (state) => {
  localStorage.setItem("darkMode", JSON.stringify(state));
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: loadThemeState(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      saveThemeState(state.darkMode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
