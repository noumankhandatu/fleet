import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

const DriverOrderId = createSlice({
  name: "id",
  initialState,
  reducers: {
    setDriverOrderId: (state, action) => {
      state.id = action.payload;
    },
    resetDriverOrderId: (state) => {
      state.id = null;
    },
  },
});

export const { setDriverOrderId, resetDriverOrderId } = DriverOrderId.actions;
export const selectDriverOrderId = (state) => state.driverOrderId.id;

export default DriverOrderId.reducer;
