import { AnyAction, ThunkAction, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import bookSlice from "./book/bookSlice";
import reservationsSlice from "./reservations/reservationsSlice";
import placesSlice from "./places/placesSlice";
import businessSlice from "./business/businessSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    reservations: reservationsSlice,
    book: bookSlice,
    places: placesSlice,
    business: businessSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
export default store;
