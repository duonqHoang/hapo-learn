import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import DetailCourse from "./Pages/DetailCourse";
import Profile from "./Pages/Profile";
import LessonDetail from "./Pages/LessonDetail";
import AllCourses from "./Pages/AllCourses";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import RootPage from "./Pages/RootPage";
import {
  checkAuth,
  checkNotAuth,
  checkResetPass,
  getLoginStatus,
} from "./Utils/auth";
import { useDispatch, useSelector } from "react-redux";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      loader: () => getLoginStatus(dispatch),
      children: [
        { index: true, element: <Home /> },
        {
          path: "signUp",
          element: <SignUp />,
          loader: () => checkNotAuth(isAuth, dispatch),
        },
        {
          path: "signIn",
          element: <SignIn />,
          loader: () => checkNotAuth(isAuth),
        },
        {
          path: "profile",
          element: <Profile />,
          loader: () => checkAuth(isAuth, dispatch),
        },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "courses", element: <AllCourses /> },
        {
          path: "courses/:courseID",
          element: <DetailCourse />,
        },
        {
          path: "courses/:courseID/:lessonID",
          element: <LessonDetail />,
        },
      ],
    },
    {
      path: "/reset-password/:username/:token",
      element: <ResetPassword />,
      loader: ({ params }) => checkResetPass(params),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
