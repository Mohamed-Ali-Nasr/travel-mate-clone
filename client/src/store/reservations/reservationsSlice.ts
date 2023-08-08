import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { IReservation } from "types/IReservation";

interface ReservationsSlice {
  reservations: IReservation[];
  selected?: IReservation;
  cancelModalOpen: boolean;
}

const initialState: ReservationsSlice = {
  reservations: [],
  selected: undefined,
  cancelModalOpen: false,
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    openCancelModal(state, action: PayloadAction<IReservation>) {
      state.selected = state.reservations.find(
        (reservation) => reservation.id === action.payload.id
      );

      if (state.selected) {
        state.cancelModalOpen = true;
      }
    },

    closeCancelModal(state) {
      state.cancelModalOpen = false;
    },

    setReservations(state, action: PayloadAction<IReservation[]>) {
      state.reservations = action.payload;
      state.selected = undefined;
      state.cancelModalOpen = false;
    },

    addReservation(state, action: PayloadAction<IReservation>) {
      state.reservations.push(action.payload);
    },

    setSelected(state, action: PayloadAction<string | undefined>) {
      state.selected = state.reservations.find(
        (reservation) => reservation.id === action.payload
      );
    },
  },
});

export default reservationsSlice.reducer;

export const reservationsActions = reservationsSlice.actions;

export const selectReservation = (state: RootState) => state.reservations;
