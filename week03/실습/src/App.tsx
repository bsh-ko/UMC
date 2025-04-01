import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. 만든 페이지들을 import
import HomePage from "./pages/home.tsx";
import NotFound from "./pages/not-found.tsx";
import Movies from "./pages/movies.tsx";

// 2. 연결
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
