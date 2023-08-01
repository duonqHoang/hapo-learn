import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import DetailCourse from "./Pages/DetailCourse";
import AllCourses from "./Pages/AllCourses";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <Home /> },
        { path: "/all-courses", element: <AllCourses /> },
        { path: "/course-detail", element: <DetailCourse /> },
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
