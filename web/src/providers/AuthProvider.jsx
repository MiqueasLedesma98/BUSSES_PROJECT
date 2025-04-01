import React, { useState, useCallback } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../services/auth";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Estado de autenticación
  const [authState, setAuthState] = useState(() => {
    const user = localStorage.getItem("user");

    return {
      auth: !!localStorage.getItem("x-token"),
      user: user ? JSON.parse(user) : null,
    };
  });

  // Mutación para login
  const loginMutation = useMutation({
    mutationFn: async (form) => {
      const { data } = await authenticateUser(form);
      console.log({ data });
      return data;
    },
    onSuccess: ({ user, token }) => {
      // Guardar en localStorage
      localStorage.setItem("x-token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Actualizar estado global
      setAuthState({ user, auth: true });

      // Redirigir al usuario
      navigate("/dashboard/content", { replace: true });
    },
    onError: (error) => {
      console.error("Error en login:", error);
    },
  });

  // Función de login usando la mutación
  const login = useCallback(
    (form) => {
      loginMutation.mutate(form);
    },
    [loginMutation]
  );

  // Logout sin necesidad de mutación
  const logout = useCallback(() => {
    localStorage.clear();
    setAuthState({ auth: false, user: null });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading: loginMutation.isPending,
        ...authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
