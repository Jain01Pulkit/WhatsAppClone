import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
};

export const UserSlice = createSlice({
  name: "User",
  initialState,

  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    resetTokenSlice: () => initialState,
  },
});

export const { setUserName, setUserEmail, resetTokenSlice } = UserSlice.actions;
