import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  isAuthenticated: false,
  profile: {
    name: "",
    email: "",
    dob: null,
    phone: "",
    address: "",
    bio: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logOut(state) {
      return initialUserState;
    },
    updateProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
