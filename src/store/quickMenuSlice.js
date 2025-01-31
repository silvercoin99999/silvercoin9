import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeQuickMenu: 0,
  isQuickMenuClick: false,
};

export const quickMenuSlice = createSlice({
  name: "quickMenu",
  initialState,
  reducers: {
    setActiveQuickMenu: (state, action) => {
      state.activeQuickMenu = action.payload;
    },
    setIsQuickMenuClick: (state, action) => {
      state.isQuickMenuClick = action.payload;
    },
  },
});

export const { setActiveQuickMenu, setIsQuickMenuClick } =
  quickMenuSlice.actions;

export default quickMenuSlice.reducer;
