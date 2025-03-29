import { useAuthContext } from "../hooks";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { auth } = useAuthContext();

  console.log(auth);

  if (!auth) return <Navigate to="/" replace />;

  return children;
}
