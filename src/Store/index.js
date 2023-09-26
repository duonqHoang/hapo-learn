import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import coursesReducer from "./courses";

const store = configureStore({
  reducer: { user: userReducer, courses: coursesReducer },
});

export default store;
