import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import DetailCourse from "./Pages/DetailCourse";
import Profile from "./Pages/Profile";
import LessonDetail from "./Pages/LessonDetail";
import AllCourses from "./Pages/AllCourses";
import ResetPassword from "./Pages/ResetPassword";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import RootPage from "./Pages/RootPage";
import { checkAuth, checkNotAuth, getAuthStatus } from "./Utils/auth";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      loader: () => getAuthStatus(dispatch),
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
        { path: "resetPassword", element: <ResetPassword /> },
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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
