import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  token: localStorage.getItem("authToken") || "",
};

// Create authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    clearToken: (state) => {
      state.token = "";
      localStorage.removeItem("authToken");
    },
  },
});

// Export actions
export const { setToken, clearToken } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
