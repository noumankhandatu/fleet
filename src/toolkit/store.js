// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import DriverOrderId from "./slices/DriverOrderId";

const store = configureStore({
  reducer: {
    auth: authSlice,
    driverOrderId: DriverOrderId,
  },
});

export default store;
