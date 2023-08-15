import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import DetailCourse from "./Pages/DetailCourse";
import LessonDetail from "./Pages/LessonDetail";
import AllCourses from "./Pages/AllCourses";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SignUp from "./Pages/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <Home /> },
        { path: "signUp", element: <SignUp /> },
        {
          path: "course/:id",
          element: <DetailCourse />,
        },
        { path: "course/:id/lesson", element: <LessonDetail /> },
      ],
    },
  ]);

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
