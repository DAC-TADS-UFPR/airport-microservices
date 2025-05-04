import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { PURGE } from "redux-persist";

interface ApiResponse {
  access_token: string;
  expire_in: number;
  access: string;
  user: string;
}

const initialState: ApiResponse = {
  access_token: "",
  expire_in: 0,
  access: "",
  user: "",
  roles: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<Partial<ApiResponse>>) {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
