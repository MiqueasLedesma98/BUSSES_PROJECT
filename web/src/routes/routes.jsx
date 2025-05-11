import { lazy } from "react";
import MainLayout from "../Layouts/MainLayout";

/**
 * @type {Array<import('react-router-dom').RouteObject>}
 */
const routes = [
  {
    path: "/",
    element: lazy(() => import("../pages/Login")),
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "content",
        element: lazy(() => import("../pages/Content")),
        children: [
          {
            path: "movies",
            element: lazy(() => import("../pages/Movies")),
            loader: async ({ ...props }) => {
              console.log(props);
              return { msg: true };
            },
          },
          {
            path: "musics",
            element: lazy(() => import("../pages/Musics")),
          },
        ],
      },
      {
        path: "advertising",
        element: lazy(() => import("../pages/Advertising")),
      },
      {
        path: "enterprise",
        element: lazy(() => import("../pages/Enterprise"))
      },
      {
        path: "metrics",
        element: lazy(() => import("../pages/Construction")),
      },
      {
        path: "*",
        element: lazy(() => import("../pages/NotFound")),
      },
    ],
    requiresAuth: true,
  },
  {
    path: "*",
    element: lazy(() => import("../pages/NotFound")),
  },
];

export { routes };
