// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import DriverOrderId from "./slices/DriverOrderId";
import CreateOrderSlice from "./slices/routes/createRouteSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    driverOrderId: DriverOrderId,
    CreateOrderSlice: CreateOrderSlice,
  },
});

export default store;
