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

const logOut = () => {
  return async (dispatch) => {
    try {
      await axios.post("logout");
      dispatch(userActions.logOut());
    } catch (err) {
      console.log(err);
    }
  };
};

export { getProfile, logOut };
