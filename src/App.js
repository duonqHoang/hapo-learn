import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
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
  checkIsTeacher,
  checkNotAuth,
  checkResetPass,
  getLoginStatus,
} from "./Utils/auth";
import { useDispatch, useSelector } from "react-redux";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import AddCourse from "./Pages/AddCourse";
import UpdateCourse from "./Pages/UpdateCourse";

function App() {
  const user = useSelector((state) => state.user);
  const isAuth = user.isAuthenticated;
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
          loader: () => checkAuth(dispatch),
        },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "courses", element: <AllCourses /> },
        {
          path: "courses/:courseID",
          element: <DetailCourse />,
        },
        {
          path: "courses/:courseID/:lessonNumber",
          element: <LessonDetail />,
          loader: () => checkAuth(dispatch),
        },
        {
          path: "create-course",
          element: <AddCourse />,
          loader: checkIsTeacher,
        },
        {
          path: "update-course/:courseID",
          element: <UpdateCourse />,
          loader: checkIsTeacher,
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
