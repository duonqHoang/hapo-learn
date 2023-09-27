import { redirect } from "react-router-dom";
import axios from "./axios";
import { userActions } from "../Store/user";

async function getLoginStatus(dispatch) {
  try {
    await axios.get("/login");
    return dispatch(userActions.login());
  } catch (err) {
    return null;
  }
}

async function checkAuth(dispatch) {
  try {
    await axios.get("/login");
    return null;
  } catch (err) {
    console.log(err);
    dispatch(userActions.logOut());
    return redirect("/signIn");
  }
}

function checkNotAuth(isAuthenticated) {
  if (isAuthenticated) {
    return redirect("/");
  }

  return null;
}

async function checkResetPass({ username, token }) {
  try {
    const data = await axios.get(`/reset-password/${username}/${token}`);
    return data;
  } catch (err) {
    console.log(err);
    return redirect("/");
  }
}

async function checkIsTeacher() {
  try {
    const res = await axios.get("/user");
    const profile = res.data;
    if (!profile.teacherProfile) {
      return redirect("/");
    }
    return null;
  } catch (err) {
    return redirect("/");
  }
}

export {
  checkAuth,
  checkNotAuth,
  getLoginStatus,
  checkResetPass,
  checkIsTeacher,
};
