import { createBrowserRouter } from "react-router-dom";

// import ErrorPage from "./pages/errors";
import HomePage from "./pages/Home";
// import BookmarksPage from "./pages/bookmarks";
// import DetailPage from "./pages/detail/[id]";

const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      //   {
      //     path: "/detail/:id",
      //     element: <DetailPage />,
      //   },
      //   {
      //     path: "/bookmarks",
      //     element: <BookmarksPage />,
      //   },
    ],
  },
]);

export default router;
