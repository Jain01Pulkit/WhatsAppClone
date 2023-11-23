import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { UserSlice } from "./Redux/UserSlice";

/**CREATE PERSIST CONFIG */
const persistConfig = {
  key: "root",
  storage,
};

// const persistedReducer = persistReducer(persistConfig, UserSlice);

/**CREATE STORE */
const store = configureStore({
  reducer: UserSlice,
});

export default store;
