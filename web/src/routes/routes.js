import { lazy } from "react";

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
    element: lazy(() => import("../pages/Dashboard")),
  },
  {
    path: "/dashboard/movies",
    element: lazy(() => import("../pages/Movies")),
  },
  {
    path: "/dashboard/musics",
    element: lazy(() => import("../pages/Musics")),
  },
  {
    path: "/dashboard/advertising",
    element: lazy(() => import("../pages/Construction")),
  },
  {
    path: "/dashboard/enterprise",
    element: lazy(() => import("../pages/Construction")),
  },
  {
    path: "/dashboard/metrics",
    element: lazy(() => import("../pages/Construction")),
  },
];

export { routes };
