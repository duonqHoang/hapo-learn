import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import DetailCourse from "./Pages/DetailCourse";
import LessonDetail from "./Pages/LessonDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <Home /> },
        {
          path: "course/:id",
          element: <DetailCourse />,
        },
        { path: "course/:id/lesson", element: <LessonDetail /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
