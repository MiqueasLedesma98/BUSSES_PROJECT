import { lazy } from "react";

/**
 * @type {[import('react-router-dom').RouteObject]}
 */
const routes = [
  {
    path: "/",
    component: lazy(() => import("../pages/Login")),
  },
  {
    path: "/dashboard",
    component: lazy(() => import("../pages/Dashboard")),
  },
  {
    path: "/dashboard/movies",
    component: lazy(() => import("../pages/Movies")),
  },
  {
    path: "/dashboard/musics",
    component: lazy(() => import("../pages/Musics")),
  },
  {
    path: "/dashboard/advertising",
    component: lazy(() => import("../pages/Construction")),
  },
  {
    path: "/dashboard/enterprise",
    component: lazy(() => import("../pages/Construction")),
  },
  {
    path: "/dashboard/metrics",
    component: lazy(() => import("../pages/Construction")),
  },
];

export { routes };
