import { createSlice } from "@reduxjs/toolkit";

const initialCoursesState = {
  totalCoursesNumber: null,
  courses: [],
  page: 1,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState: initialCoursesState,
  reducers: {
    updateCourses(state, action) {
      state.courses = action.payload;
    },
  },
});

export const coursesActions = coursesSlice.actions;
export default coursesSlice.reducer;
