import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home";
import DetailPage from "./pages/Detail";
import BookmarksPage from "./pages/Bookmarks";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
      {
        path: "/bookmarks",
        element: <BookmarksPage />,
      },
    ],
  },
]);

export default router;
