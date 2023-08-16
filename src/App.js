import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Home from "./Pages/Home";
import DetailCourse from "./Pages/DetailCourse";
import Profile from "./Pages/Profile";
import LessonDetail from "./Pages/LessonDetail";
import AllCourses from "./Pages/AllCourses";
import ResetPassword from "./Pages/ResetPassword";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import RootPage from "./Pages/RootPage";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <RootPage />,
      children: [
        { index: true, element: <Home /> },
        { path: "signUp", element: <SignUp /> },
        { path: "signIn", element: <SignIn /> },
        { path: "profile", element: <Profile /> },
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
