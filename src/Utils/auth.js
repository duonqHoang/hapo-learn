import { redirect } from "react-router-dom";
import axios from "./axios";
import { userActions } from "../Store/user";

async function getAuthStatus(dispatch) {
  try {
    await axios.get("/login");
    return dispatch(userActions.login());
  } catch (err) {
    return null;
  }
}

function checkAuth(isAuthenticated, dispatch) {
  if (!isAuthenticated) {
    dispatch(userActions.logOut());
    return redirect("/signIn");
  }

  return null;
}

function checkNotAuth(isAuthenticated) {
  if (isAuthenticated) {
    return redirect("/");
  }

  return null;
}

export { checkAuth, checkNotAuth, getAuthStatus };
