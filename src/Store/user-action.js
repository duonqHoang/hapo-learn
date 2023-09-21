import axios from "../Utils/axios";
import { userActions } from "./user";

const getProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/user`);
      const profile = res.data;
      dispatch(userActions.updateProfile(profile));
    } catch (err) {
      console.log(err);
    }
  };
};

export { getProfile };
