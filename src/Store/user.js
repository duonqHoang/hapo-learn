import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  isAuthenticated: false,
  info: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logOut(state) {
      state.isAuthenticated = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
