import { lazy } from "react";

const routes = [
  {
    path: "/home",
    component: lazy(() => import("../pages/Home")),
    requiresAuth: true,
  },
  {
    path: "/login",
    component: lazy(() => import("../pages/Login")),
  },
];

export { routes };
