import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import { IUser } from "types/IUser";

interface AuthSlice {
  isLogged: boolean;
  modalOpen: boolean;
  user?: IUser;
  loading: boolean;
  message?: string;
  errorMessage?: string;
}

const initialState: AuthSlice = {
  isLogged: false,
  modalOpen: false,
  user: undefined,
  loading: false,
  message: undefined,
  errorMessage: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showModal(state) {
      state.modalOpen = true;
      state.errorMessage = undefined;
      state.message = undefined;
      state.loading = false;
    },

    hideModal(state) {
      state.modalOpen = false;
      state.errorMessage = undefined;
      state.message = undefined;
      state.loading = false;
    },

    setUser(state, action: PayloadAction<IUser | undefined>) {
      state.user = action.payload;
      state.isLogged = action.payload !== undefined;
      state.modalOpen = false;
      state.errorMessage = undefined;
      state.message = undefined;
      state.loading = false;
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

export default authSlice.reducer;

export const authActions = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
