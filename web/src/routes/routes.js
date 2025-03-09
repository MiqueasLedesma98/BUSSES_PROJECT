import { lazy } from "react";

const routes = [
  {
    path: "/home",
    component: lazy(() => import("../pages/Home")),
    requiresAuth: true,
  },
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
