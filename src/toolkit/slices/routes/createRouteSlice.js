import { createSlice } from "@reduxjs/toolkit";

const CreateOrderSlice = createSlice({
  name: "CreateOrderSlice",
  initialState: {
    orderIds: "",
    routeName: "",
    driverId: "",
  },
  reducers: {
    setOrderIds: (state, action) => {
      state.orderIds = action.payload;
    },
    setRouteName: (state, action) => {
      state.routeName = action.payload;
    },
    setDriverId: (state, action) => {
      state.driverId = action.payload;
    },
  },
});

export const { setOrderIds, setRouteName, setDriverId } = CreateOrderSlice.actions;

export const selectOrderIds = (state) => state?.CreateOrderSlice?.orderIds;
export const selectRouteName = (state) => state?.CreateOrderSlice?.routeName;
export const selectDriverId = (state) => state?.CreateOrderSlice?.driverId;

export default CreateOrderSlice.reducer;
