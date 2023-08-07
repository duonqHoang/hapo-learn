import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import DetailCourse from "./Pages/DetailCourse";
import Profile from "./Pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <Home /> },
        { path: "/course-detail", element: <DetailCourse /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
