import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { IFreeSlot } from "types/IFreeSlot";

interface BookState {
  modalOpen: boolean;
  freeSlots: IFreeSlot[];
  selectedDate?: string;
  selectedTime?: string;
  placeId?: string;
  serviceId?: string;
  loading: boolean;
  message?: string;
  errorMessage?: string;
}

const initialState: BookState = {
  modalOpen: false,
  freeSlots: [],
  selectedDate: undefined,
  selectedTime: undefined,
  placeId: undefined,
  serviceId: undefined,
  loading: false,
  message: undefined,
  errorMessage: undefined,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    showModal(
      state,
      action: PayloadAction<{
        slots: IFreeSlot[];
        placeId: string;
        serviceId: string;
      }>
    ) {
      state.modalOpen = true;
      state.freeSlots = action.payload.slots;
      state.placeId = action.payload.placeId;
      state.serviceId = action.payload.serviceId;
      state.errorMessage = undefined;
      state.message = undefined;
      state.loading = false;
    },

    setDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
      state.selectedTime = undefined;
    },

    setTime(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
    },

    hideModal(state) {
      state.modalOpen = false;
      state.freeSlots = [];
      state.selectedDate = undefined;
      state.selectedTime = undefined;
      state.placeId = undefined;
      state.serviceId = undefined;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    setMessage(state, action: PayloadAction<string | undefined>) {
      state.message = action.payload;
    },

    setErrorMessage(state, action: PayloadAction<string | undefined>) {
      state.errorMessage = action.payload;
    },
  },
});

export default bookSlice.reducer;

export const bookActions = bookSlice.actions;

export const selectBook = (state: RootState) => state.book;
