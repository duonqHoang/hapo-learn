import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import DetailCourse from "./Pages/DetailCourse";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <Home /> },
        { path: "/course-detail", element: <DetailCourse /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
