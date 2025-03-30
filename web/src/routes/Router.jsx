import { useRoutes } from "react-router-dom";
import { routes } from "./routes.jsx";
import ProtectedRoute from "../components/ProtectedRoute";
import { Suspense } from "react";
import SqueletonPage from "../pages/SqueletonPage.jsx";

export default function Router() {
  const generateRoutes = (routes) =>
    routes?.map((route) => ({
      path: route.path,
      element: route.requiresAuth ? (
        <ProtectedRoute>{route.element}</ProtectedRoute>
      ) : (
        <Suspense fallback={<SqueletonPage />}>
          <route.element />
        </Suspense>
      ),
      loader: route.loader,
      children: route.children ? generateRoutes(route.children) : undefined,
    }));

  return useRoutes(generateRoutes(routes));
}
