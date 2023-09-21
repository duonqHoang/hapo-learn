import { createSlice } from "@reduxjs/toolkit";

const initialCoursesState = {
  totalCoursesNumber: 0,
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState: initialCoursesState,
  reducers: {
    updateCourses(state, action) {
      state.courses = action.payload[0];
      state.totalCoursesNumber = action.payload[1];
    },
  },
});

export const coursesActions = coursesSlice.actions;
export default coursesSlice.reducer;
