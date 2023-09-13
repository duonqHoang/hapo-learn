import axios from "../Utils/axios";
import { coursesActions } from "./courses";

const getCourses = (params) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/courses?${params.toString()}`);
      const courses = res.data;
      dispatch(coursesActions.updateCourses(courses));
    } catch (err) {
      console.log(err);
    }
  };
};

export { getCourses };
