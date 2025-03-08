import { Suspense } from "react";
import { routes } from "./routes.js";
import ProtectedRoute from "../components/ProtectedRoute";
import { useRoutes } from "react-router-dom";
export default function Router() {
  const generateRoutes = (routes) =>
    routes?.map((route) => {
      const element = (
        <Suspense fallback={<div>Cargando...</div>}>
          <route.component />
        </Suspense>
      );
      return {
        path: route.path,
        element: route.requiresAuth ? (
          <ProtectedRoute>{element}</ProtectedRoute>
        ) : (
          element
        ),
        children: route.children ? generateRoutes(route.children) : undefined,
      };
    });
  return useRoutes(generateRoutes(routes));
}
